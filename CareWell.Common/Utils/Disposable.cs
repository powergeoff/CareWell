using System;

namespace CareWell.Common.Utils
{
    public struct Disposable : IDisposable
    {
        private readonly Action _action;

        public Disposable(Action action)
        {
            _action = action;
        }

        void IDisposable.Dispose()
        {
            _action();
        }
    }
}
