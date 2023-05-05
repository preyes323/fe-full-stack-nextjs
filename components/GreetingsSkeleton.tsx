import Card from "./Card";

export default function GreetingsSkeleton() {
  return (
    <Card className="w-full py-4 relative overflow-hidden">
      <div className="mb-4">
        <div className="h-8 w-1/2 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-6 mt-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div>
        <div className="h-12 w-1/2 bg-gray-300 animate-pulse rounded"></div>
      </div>
    </Card>
  );
}
