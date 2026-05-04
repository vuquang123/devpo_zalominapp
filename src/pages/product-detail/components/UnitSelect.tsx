import React from "react";
import { StockUnit } from "@/types/stock.types";
import { formatCurrency } from "@/utils/format";
import { Text } from "zmp-ui";

interface UnitSelectProps {
  units: StockUnit[];
  selectedUnitId?: string;
  onSelect: (unitId: string) => void;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ units, selectedUnitId, onSelect }) => {
  return (
    <div className="mt-4">
      <div className="mb-3 text-large-m text-text-primary">Chọn máy hiện có (IMEI)</div>
      <div className="space-y-3">
        {units.map((unit) => {
          const isSelected = selectedUnitId === unit.id;
          const batteryColor = Number(unit.battery) >= 90 ? "text-green-600" : Number(unit.battery) >= 80 ? "text-yellow-600" : "text-red-600";

          return (
            <div
              key={unit.id}
              onClick={() => onSelect(unit.id)}
              className={`relative flex flex-col gap-2 rounded-2xl border p-4 transition-all active:scale-[0.98] ${
                isSelected
                  ? "border-blue500 bg-blue-50 shadow-sm"
                  : "border-divider01 bg-white hover:border-blue200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${isSelected ? "bg-blue500" : "bg-neutral200"}`} />
                  <Text className="font-bold text-text-primary">{unit.imei || unit.id}</Text>
                </div>
                <Text className={`text-large-m ${isSelected ? "text-blue600" : "text-primary"}`}>
                  {formatCurrency(unit.price)}
                </Text>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full bg-white px-2.5 py-1 text-xsmall-m border ${batteryColor}`}>
                  🔋 Pin: {unit.battery}%
                </span>
                <span className="rounded-full bg-neutral100 px-2.5 py-1 text-xsmall-m text-text-secondary border border-divider01">
                   ✨ {unit.condition}
                </span>
                <span className="rounded-full bg-neutral100 px-2.5 py-1 text-xsmall-m text-text-secondary border border-divider01">
                  📱 {unit.type}
                </span>
                {unit.color && (
                   <span className="rounded-full bg-neutral100 px-2.5 py-1 text-xsmall-m text-text-secondary border border-divider01">
                   🎨 {unit.color}
                 </span>
                )}
              </div>

              {isSelected && (
                <div className="absolute -right-1 -top-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue500 text-[10px] text-white shadow-sm">
                    ✓
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnitSelect;
