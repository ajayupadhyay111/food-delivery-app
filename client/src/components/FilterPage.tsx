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
  const appliedFilterHandler = (label: string) => {
    console.log(`Applied filter: ${label}`);
    // Here you can implement the logic to apply the filter
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by Cuisines</h1>
        <Button variant={"link"}>Reset</Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox id={option.id} onClick={()=>appliedFilterHandler(option.label)}/>
            <Label htmlFor={option.id} >{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
