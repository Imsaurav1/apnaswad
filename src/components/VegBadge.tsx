interface VegBadgeProps {
  isVeg: boolean;
  label?: boolean;
}

export function VegBadge({ isVeg, label = false }: VegBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5" title={isVeg ? 'Pure Veg' : 'Contains Egg / Chicken'}>
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border-[1.5px] bg-white ${
          isVeg ? 'border-emerald-600' : 'border-red-600'
        }`}
      >
        {isVeg ? (
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
        ) : (
          <span className="h-0 w-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-red-600" />
        )}
      </span>
      {label && (
        <span className={`text-xs font-semibold ${isVeg ? 'text-emerald-700' : 'text-red-700'}`}>
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </span>
  );
}
