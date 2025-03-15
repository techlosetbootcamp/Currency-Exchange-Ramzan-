export interface CardProps {
  to: string;
  from: string;
}

export interface TypeOfArray {
  names: string[];
  rates: string[];
  dataData: Country[];
}

export interface DropdownItem {
  code: string;
  name: string;
}

export interface SearchableDropdownProps {
  items: DropdownItem[];
  defaultSelected: DropdownItem;
}

export interface Country {
  name: string;
  currency: string;
}
export interface initialStateType {
  names: string[];
  rates: string[];
  resultName: string[];
  resultRates: string[];
  dataData: Country[];
}
