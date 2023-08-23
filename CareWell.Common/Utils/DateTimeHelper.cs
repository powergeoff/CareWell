using System;
using System.Globalization;

namespace CareWell.Common.Utils
{
    public class DateTimeHelper
    {
        private static CultureInfo _us = new CultureInfo("en-US");
        private static string _timeZoneId = "Eastern Standard Time";
        public static DateTime UtcNow => DateTime.UtcNow;
        public static DateTime Now => TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, _timeZoneId);
        public static DateTime? TryParse(string s, string format) =>
            DateTime.TryParseExact(s, format, _us, DateTimeStyles.AllowWhiteSpaces, out var value) ? value : (DateTime?)null;
    }
    public static class GetWeekDay
    {
        public static DateTime GetPreviousWeekDay(this DateTime date, DayOfWeek dayOfWeek)
        {
            while (date.DayOfWeek != dayOfWeek)
                date = date.AddDays(-1);

            return new DateTime(date.Year, date.Month, date.Day);
        }
        public static DateTime GetNextWeekDay(this DateTime date, DayOfWeek dayOfWeek)
        {
            while (date.DayOfWeek != dayOfWeek)
                date = date.AddDays(+1);

            return new DateTime(date.Year, date.Month, date.Day).AddDays(1).Subtract(new TimeSpan(0, 0, 0, 0, 1));
        }
    }

}
