import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

/** Catches unexpected runtime errors inside interactive client islands without crashing the page. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Unexpected rendering error',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[Brandbook ErrorBoundary]', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-neutral-900 dark:bg-[#0D0E0D] dark:text-neutral-100">
        <div className="squircle-lg w-full max-w-md border border-neutral-200 bg-neutral-50/80 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
            Brand System Recovery
          </p>
          <h1 className="mt-2 text-xl font-medium tracking-tight text-neutral-950 dark:text-white">
            Unable to render brandbook preview
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            {this.state.errorMessage ?? 'An unexpected client error occurred.'}
          </p>
          <div className="mt-6 flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={this.handleReset}
              className="squircle-md bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="squircle-md border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
