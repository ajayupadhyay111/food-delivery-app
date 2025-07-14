import useRestaurantStore from "@/zustand/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type IFilterOption = {
  id: string;
  label: string;
};

const filterOptions: IFilterOption[] = [
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
  { id: "thali", label: "Thali" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    console.log(`Applied filter: ${value}`);
    setAppliedFilter(value);
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by Cuisines</h1>
        <Button
          className=" active:underline bg-transparent text-black dark:text-white hover:bg-transparent shadow-none"
          onClick={resetAppliedFilter}
        >
          Reset
        </Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
