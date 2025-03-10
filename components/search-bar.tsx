"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { City, useCities } from "@/queries/useCities";
import { useDebounce } from "@uidotdev/usehooks";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    data: cities,
    isFetching,
    isSuccess,
    isLoading,
    error,
  } = useCities(debouncedSearchQuery);

  const history = useMemo(() => getSearchHistory(), [open]);

  const handleSelect = (city: City) => {
    const { name, latitude, longitude } = city;
    setOpen(false);
    addToSearchHistory(city);
    router.push(
      `/${encodeURIComponent(name)}?latitude=${latitude}&longitude=${longitude}`,
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="flex items-center gap-4">
      <Link href="/">
        <Button variant="link">Home</Button>
      </Link>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="md:w-[400px] md:grow-0 grow-1" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex ml-auto justify-between"
          >
            Choose city...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              onInput={(event) => {
                setSearchQuery(event.currentTarget.value.trim());
              }}
              placeholder="Search..."
              className="h-9"
            />
            <CommandList>
              {isFetching && <CommandLoading />}
              {debouncedSearchQuery && isSuccess && cities.length === 0 && (
                <CommandEmpty>No cities found.</CommandEmpty>
              )}
              {(!isSuccess || !debouncedSearchQuery) && (
                <CommandEmpty>
                  <span className="text-muted-foreground">
                    Start typing to find a city.
                  </span>
                </CommandEmpty>
              )}
              <CommandGroup>
                {!debouncedSearchQuery.length && (
                  <div className="flex flex-col gap-2">
                    <h4 className="px-2 pt-2 text-sm font-medium text-muted-foreground">
                      Search history
                    </h4>
                    {history.map((city: City) => (
                      <div key={city.id}>
                        <CommandItem
                          className="items-start"
                          key={city.id}
                          onSelect={() => handleSelect(city)}
                        >
                          <span className="whitespace-nowrap">{city.name}</span>
                          <span className="ml-auto text-right text-muted-foreground">
                            {`${city.area}, ${city.country}`}
                          </span>
                        </CommandItem>
                      </div>
                    ))}
                  </div>
                )}

                {cities?.map((city) => (
                  <CommandItem
                    className="items-start"
                    key={city.id}
                    onSelect={() => handleSelect(city)}
                  >
                    <span className="whitespace-nowrap">{city.name}</span>
                    <span className="ml-auto text-right text-muted-foreground">
                      {`${city.area}, ${city.country}`}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    //   <Button
    //     variant="outline"
    //     role="combobox"
    //     aria-expanded={open}
    //     className="w-full justify-start text-muted-foreground"
    //     onClick={() => setOpen(true)}
    //   >
    //     <Search className="mr-2 h-4 w-4" />
    //     Search for a city...
    //   </Button>
    //   <CommandDialog open={open} onOpenChange={setOpen}>
    //     <CommandInput placeholder="Type a city name..." />
    //     <CommandList>
    //       <CommandEmpty>No cities found.</CommandEmpty>
    //       <CommandGroup>
    //         {MOCK_CITIES.map((city) => (
    //           <CommandItem key={city.id} onSelect={() => handleSelect(city.id)}>
    //             {city.name}
    //           </CommandItem>
    //         ))}
    //       </CommandGroup>
    //     </CommandList>
    //   </CommandDialog>
    // </>
  );
}

function addToSearchHistory(city: City) {
  const history = getSearchHistory().filter((c: City) => c.id !== city.id);
  history.unshift(city);
  localStorage.setItem("searchHistory", JSON.stringify(history));
}

function getSearchHistory() {
  const existingHistory = localStorage.getItem("searchHistory");
  return existingHistory ? JSON.parse(existingHistory) : [];
}
