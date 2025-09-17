import { Html, useProgress } from '@react-three/drei';

export function LoadingProgress() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-1" />
        <div className="text-xs font-medium text-gray-600">Loading {progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}