import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { cn } from "@/lib";
import { commonActions } from "@/lib/redux/slices/common";

import { Icon } from "./icon";

const SearchWithAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null); // Properly typing the ref

  // Function to handle the click event to toggle search input and autofocus
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      // Focus the input when it opens
      inputRef.current.focus();
    }
  };

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  useEffect(() => {
    dispatch(commonActions.setSearchValue(debouncedSearchTerm));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div
      className={cn(
        `flex items-center rounded-full bg-white px-2 py-2 shadow-sm transition-all duration-500 ease-in-out`,
      )}
    >
      {/* Search Input */}
      <input
        ref={inputRef} // Attach the input reference
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Start Typing..."
        className={cn(
          "flex-grow bg-transparent text-sm outline-none transition-all duration-500 ease-in-out",
          isOpen ? "w-72 px-4" : "w-0", // Adjust the width when input is open
        )}
      />

      {/* Search Icon */}
      <div
        onClick={handleClick}
        className="flex size-6 cursor-pointer items-center justify-center transition-transform duration-500 ease-in-out"
      >
        <Icon name="Search" />
      </div>
    </div>
  );
};

export default SearchWithAnimation;
