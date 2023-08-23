using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace CareWell.Core.Infrastructure.Services
{
    public interface ICypherService
    {
        string Encrypt(string base64string, string keyString);
        string Decrypt(string base64string, string keyString);
        string DecryptEpicParameters(string base64string, string keyString);
    }
    public class CypherService : ICypherService
    {
        private readonly ILogger<CypherService> _logger;

        public CypherService(ILogger<CypherService> logger)
        {
            _logger = logger;
        }

        public string Encrypt(string base64string, string keyString)
        {
            if (string.IsNullOrEmpty(base64string))
                return base64string;
            try
            {
                var key = Encoding.UTF8.GetBytes(keyString);
                using (var aesAlg = Aes.Create())
                {
                    var iv = aesAlg.IV;
                    using (var encryptor = aesAlg.CreateEncryptor(key, iv))
                    using (var msEncrypt = new MemoryStream())
                    {
                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                            swEncrypt.Write(base64string);

                        var decryptedContent = msEncrypt.ToArray();

                        var result = new byte[iv.Length + decryptedContent.Length];

                        Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                        Buffer.BlockCopy(decryptedContent, 0, result, iv.Length, decryptedContent.Length);

                        return Convert.ToBase64String(result);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Can't encrypt string <{base64string}>");
            }
            return null;
        }

        public string Decrypt(string base64string, string keyString)
        {
            if (string.IsNullOrEmpty(base64string))
                return base64string;
            try
            {
                var key = Encoding.UTF8.GetBytes(keyString);
                var fullCipher = Convert.FromBase64String(base64string);

                var iv = new byte[16];
                var cipher = new byte[fullCipher.Length - iv.Length];

                Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
                Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, fullCipher.Length - iv.Length);

                using (var aesAlg = Aes.Create())
                using (var decryptor = aesAlg.CreateDecryptor(key, iv))
                using (var msDecrypt = new MemoryStream(cipher))
                using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                using (var srDecrypt = new StreamReader(csDecrypt))
                    return srDecrypt.ReadToEnd();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Can't decrypt string <{base64string}>");
            }
            return null;
        }

        public string DecryptEpicParameters(string base64string, string keyString)
        {
            if (string.IsNullOrEmpty(base64string))
                return base64string;
            try
            {
                var key = Encoding.UTF8.GetBytes(keyString);
                var iv = Encoding.UTF8.GetBytes(base64string, 0, 16);
                var cipher = Convert.FromBase64String(base64string.Substring(16));

                using (var aesAlg = Aes.Create())
                using (var decryptor = aesAlg.CreateDecryptor(key, iv))
                using (var msDecrypt = new MemoryStream(cipher))
                using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                using (var srDecrypt = new StreamReader(csDecrypt))
                    return srDecrypt.ReadToEnd();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Can't decrypt string <{base64string}>");
            }
            return null;
        }
    }
}