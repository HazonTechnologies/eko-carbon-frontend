import { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import {
  dummyData,
  columns as offsetterColumns,
} from "../../lib/common/offsetterBoad";
import SelectUI from "../utilities/SelectUI";
import { dateRanges } from "../../lib/common/dateRange";
import TableUI from "../utilities/TableUI";

const OffsetterTable = () => {
  const [columns, setColumns] = useState(offsetterColumns);
  const [data, setData] = useState(dummyData);
  const [dateRange, selectDateRange] = useState<string | null>("thisWeek");
  const [loading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 13,
  });
  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>[] | SorterResult<any>,
  ) => {
    console.log(pagination, filters, sorter);
    setPagination(pagination);
  };

  useEffect(() => {
    setColumns(offsetterColumns);
    setData(dummyData);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3>Offsetters</h3>
        <SelectUI
          menuItem={dateRanges}
          selectOption={selectDateRange}
          selected={dateRange}
        />
      </div>
      <TableUI
        loading={loading}
        pagination={pagination}
        handleChange={handleChange}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default OffsetterTable;
