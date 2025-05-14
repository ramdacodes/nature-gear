import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
  CheckCircledIcon,
  Cross1Icon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  Column,
  ColumnDef,
  FilterFn,
  Row,
  Table as TanstackTable,
  flexRender,
} from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon, LoaderIcon } from "lucide-react"
import { JSX, Key, useEffect, useState } from "react"
import React from "react"

import { useDebounceTable as useDebounce } from "@/hooks/use-debounce-table"
import { cn } from "@/lib/utils"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Skeleton } from "./skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Toggle } from "./toggle"

interface DataTableProps<TData, TValue = never> {
  columns: ColumnDef<TData, TValue>[]
  table: TanstackTable<TData>
  isLoading?: boolean
  isError?: boolean
  getRowKey: (row: Row<TData>) => Key
  density?: "base" | "large" | "xlarge"
}

export function DataTable<TData, TValue = never>({
  columns,
  table,
  isLoading = false,
  isError = false,
  getRowKey,
  density = "base",
}: DataTableProps<TData, TValue>) {
  const { pageSize } = table.getState().pagination

  const densitySize: Record<typeof density, number> = {
    base: 50,
    large: 75,
    xlarge: 100,
  }

  return (
    <Table className="border-t">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="h-[50px]">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="whitespace-nowrap px-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody style={{ height: `${densitySize[density] * pageSize}px` }}>
        {isLoading ? (
          [...Array(pageSize).keys()].map((row) => (
            <TableRow
              key={row}
              className={cn(
                density === "base" && "h-[50px]",
                density === "large" && "h-[75px]",
                density === "xlarge" && "h-[100px]"
              )}>
              {[...Array(columns.length).keys()].map((cell) => (
                <TableCell key={cell} className="px-2 py-0">
                  <Skeleton className="h-[25px]" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="p-2 text-center">
              <span className="text-red-500">Terjadi kesalahan.</span>
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows?.length ? (
          <>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={getRowKey(row)}
                className={cn(
                  density === "base" && "h-[50px]",
                  density === "large" && "h-[75px]",
                  density === "xlarge" && "h-[100px]"
                )}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-2 py-0 [&]:first:pl-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length < pageSize ? (
              <TableRow className="bg-muted/50">
                <TableCell colSpan={columns.length}></TableCell>
              </TableRow>
            ) : null}
          </>
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 p-2 text-center">
              Tidak ada data yang ditemukan.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export const rangeFilter: FilterFn<any> = (row, columnId, value) => {
  const currentPrice = row.getValue(columnId)

  const isPriceValid = (price: any) => typeof price === "number"

  if (typeof currentPrice !== "number" || !Array.isArray(value)) return true

  const min = value[0]
  const max = value[1]

  if (isPriceValid(min) && isPriceValid(max)) {
    return min <= currentPrice && currentPrice <= max
  }

  if (isPriceValid(min)) {
    return min <= currentPrice
  }

  if (isPriceValid(max)) {
    return currentPrice <= max
  }

  return true
}

export const calendarFilter: FilterFn<any> = (row, columnId, value) => {
  const currentDate = row.getValue(columnId)

  const isDateValid = (dateString: any) =>
    typeof dateString === "string" && !isNaN(new Date(dateString).getTime())

  if (typeof currentDate !== "number" || !Array.isArray(value)) {
    return true
  }

  const from = value[0]
  const to = value[1]

  if (isDateValid(from) && isDateValid(to)) {
    return (
      currentDate >= new Date(from).getTime() &&
      currentDate <= new Date(to).getTime()
    )
  }

  if (isDateValid(from)) {
    return currentDate >= new Date(from).getTime()
  }

  return true
}

type FilterType = "text" | "select"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  filterType: FilterType
  selectItems?: { value: string; label: string }[]
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  filterType,
  selectItems = [],
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {column.getCanFilter() ? (
        <FilterButton
          column={column}
          title={title}
          filterType={filterType}
          selectItems={selectItems}
        />
      ) : (
        <span className="mx-2">{title}</span>
      )}
      {column.getCanSort() ? <SortButton column={column} /> : null}
    </div>
  )
}

interface FilterButtonProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  filterType: FilterType
  selectItems: { value: string; label: string }[]
}

function FilterButton<TData, TValue>({
  column,
  title,
  filterType,
  selectItems,
}: FilterButtonProps<TData, TValue>) {
  const [filterActive, setFilterActive] = useState(false)

  const filterInput: Record<typeof filterType, JSX.Element> = {
    text: (
      <TextFilter
        column={column}
        placeholder={`Cari ${title.toLowerCase()}...`}
      />
    ),
    select: (
      <SelectFilter
        column={column}
        placeholder={`Cari ${title.toLowerCase()}`}
        items={selectItems}
      />
    ),
  }

  function handleResetFilter() {
    column.setFilterValue(undefined)
    setFilterActive(false)
  }

  if (filterActive)
    return (
      <>
        <Button
          size="icon"
          className="h-4 w-4 shrink-0 rounded-sm"
          variant="outline"
          onClick={handleResetFilter}>
          <Cross1Icon className="h-2 w-2" />
        </Button>
        {filterInput[filterType]}
      </>
    )

  return (
    <Button
      className="h-8 px-2 py-0"
      variant="ghost"
      size="sm"
      onClick={() => setFilterActive(true)}>
      {title}
    </Button>
  )
}

interface FilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

interface TextFilterProps<TData, TValue> extends FilterProps<TData, TValue> {
  placeholder: string
}

function TextFilter<TData, TValue>({
  column,
  placeholder,
}: TextFilterProps<TData, TValue>) {
  const [currentFilter, setCurrentFilter] = useState("")

  useDebounce(() => column.setFilterValue(currentFilter), [currentFilter])

  return (
    <Input
      className="h-8 w-[150px] px-2 py-0 font-normal"
      placeholder={placeholder}
      onChange={(e) => setCurrentFilter(e.target.value)}
    />
  )
}

interface SelectFilterProps<TData, TValue> extends FilterProps<TData, TValue> {
  placeholder: string
  items: { value: string; label: string }[]
}

function SelectFilter<TData, TValue>({
  column,
  placeholder,
  items,
}: SelectFilterProps<TData, TValue>) {
  return (
    <Select onValueChange={(value) => column.setFilterValue(value)}>
      <SelectTrigger className="h-8 w-[150px] px-2 py-0 font-normal [&>span:first-child]:truncate">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface SortButtonProps<TData, TValue> {
  column: Column<TData, TValue>
}

function SortButton<TData, TValue>({ column }: SortButtonProps<TData, TValue>) {
  const [status, setStatus] = useState<"asc" | "desc">()
  const isSorted = column.getIsSorted()

  useDebounce(() => {
    if (!status) return column.clearSorting()
    if (status === "asc") return column.toggleSorting(false)
    if (status === "desc") return column.toggleSorting(true)
  }, [status])

  useEffect(() => {
    if (!isSorted) setStatus(undefined)
  }, [isSorted])

  function handleSortingChange() {
    if (!status) return setStatus("asc")
    if (status === "asc") return setStatus("desc")
    if (status === "desc") return setStatus(undefined)
  }

  return (
    <Toggle
      pressed={!!status}
      onPressedChange={handleSortingChange}
      className="h-4 w-4 rounded-sm p-0"
      variant="outline">
      {status === "desc" ? (
        <CaretUpIcon />
      ) : status === "asc" ? (
        <CaretDownIcon />
      ) : (
        <CaretSortIcon />
      )}
    </Toggle>
  )
}

interface DataTableToolbarProps<TData> {
  table: TanstackTable<TData>
  columnLabel: Record<keyof TData, string>
  placeholderFilter?: string
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  columnLabel,
  placeholderFilter,
  isLoading = false,
  className,
  children,
}: DataTableToolbarProps<TData>) {
  const [currentFilter, setCurrentFilter] = useState("")
  const [isFilterLoading, setIsFilterLoading] = useState(false)

  useDebounce(() => {
    table.setGlobalFilter(currentFilter)
    setIsFilterLoading(false)
  }, [currentFilter])

  return (
    <div className={cn("flex justify-between", className)}>
      <div className="flex flex-1 items-center justify-between p-2">
        <div
          className={cn(
            "flex items-center space-x-0",
            placeholderFilter && "space-x-2"
          )}>
          <div
            className={cn(
              "relative",
              isFilterLoading &&
                "after:absolute after:right-2 after:top-2 after:block after:h-4 after:w-4 after:animate-spin after:bg-[url('./../../loader.svg')] after:bg-contain after:opacity-50"
            )}>
            {placeholderFilter ? (
              <Input
                placeholder={placeholderFilter}
                value={currentFilter}
                onChange={(e) => {
                  if (!isFilterLoading) setIsFilterLoading(true)
                  setCurrentFilter(e.target.value)
                }}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            ) : null}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto flex h-8">
                <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                Tampilan
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Tampilkan kolom</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {columnLabel?.[column.id as keyof TData] || "???"}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">{children}</div>
      </div>
      <div className="flex w-12 shrink-0 items-center justify-center self-stretch border-l">
        {isLoading ? (
          <LoaderIcon className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <CheckCircledIcon width={16} height={16} className="text-green-500" />
        )}
      </div>
    </div>
  )
}

interface DataTablePaginationProps<TData> {
  table: TanstackTable<TData>
  rowCount?: number
  pageRows?: number[]
}

export function DataTablePagination<TData>({
  table,
  rowCount,
  pageRows = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  return (
    <div className="sticky bottom-0 flex flex-wrap items-center justify-between border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-2 flex-1 p-2 text-sm text-muted-foreground">
        {rowCount || 0} item
      </div>

      <div className="flex flex-wrap items-center space-x-4 p-2 sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">Baris per halaman</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageRows.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-auto items-center justify-center text-sm font-medium">
          <span className="block sm:hidden">Halaman&nbsp;</span>
          {table.getState().pagination.pageIndex + 1}
          <span className="mx-1 font-normal sm:block">dari</span>
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 sm:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Ke halaman pertama</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Ke halaman sebelumnya</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Ke halaman selanjutnya</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 sm:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Ke halaman terakhir</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}