import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Text } from "zmp-ui";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleBackToHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-6 text-center">
          <div className="mb-6 text-6xl">⚠️</div>
          <Text size="large" className="font-bold text-text-primary">
            Đã có lỗi xảy ra!
          </Text>
          <Text size="small" className="mt-2 text-text-secondary">
            Ứng dụng gặp sự cố không mong muốn. Vui lòng thử lại hoặc quay về trang chủ.
          </Text>
          <Button
             className="mt-8 rounded-full bg-blue500 px-8 py-2 text-white"
             onClick={this.handleBackToHome}
          >
            Quay lại trang chủ
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
