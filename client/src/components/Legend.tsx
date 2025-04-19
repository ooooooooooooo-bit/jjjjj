import { Card, CardContent } from "@/components/ui/card";

export default function Legend() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-2">Llegenda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#e3f2fd] border border-gray-300 mr-2"></div>
            <span>Metalls alcalins</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#ffcdd2] border border-gray-300 mr-2"></div>
            <span>Metalls alcalinoterris</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#e1bee7] border border-gray-300 mr-2"></div>
            <span>Metalls de transició</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#c8e6c9] border border-gray-300 mr-2"></div>
            <span>Grup 13</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#ffe0b2] border border-gray-300 mr-2"></div>
            <span>Grup 14</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#d7ccc8] border border-gray-300 mr-2"></div>
            <span>Grup 15</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#b3e5fc] border border-gray-300 mr-2"></div>
            <span>Grup 16</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#dcedc8] border border-gray-300 mr-2"></div>
            <span>Grup 17 (Halògens)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-[#f8bbd0] border border-gray-300 mr-2"></div>
            <span>Grup 18 (Gasos nobles)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
