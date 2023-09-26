import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import React from "react";

const UniqueFiltersComponent = ({ filters, open }) => {
  return (
    <div>
      <h3 className="-my-3 flow-root">
        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">Brand</span>
          <span className="ml-6 flex items-center">
            {open ? (
              <MinusIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
        </Disclosure.Button>
      </h3>
      <Disclosure.Panel className="pt-6">
        <div className="space-y-4">
          {/* Use the filters prop to populate the options */}
          {filters.map(
            (section) =>
              section.id === "brand" && // Make sure it's the "Brand" filter
              section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`filter-${section.id}-${optionIdx}`}
                    name={`${section.id}[]`}
                    defaultValue={option.value}
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {option.label}
                  </label>
                </div>
              ))
          )}
        </div>
      </Disclosure.Panel>
    </div>
  );
};

export default UniqueFiltersComponent;
