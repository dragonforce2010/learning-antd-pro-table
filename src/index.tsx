import * as React from "react";
import { render } from "react-dom";
import moment from "moment";
import { Button, Input } from "antd";

import "antd/dist/antd.css";
import "@ant-design/pro-table/dist/protable.css";

import ProTable, { ProColumns } from "@ant-design/pro-table";
import "./styles.css";

const columns: ProColumns[] = [
  {
    title: "Name",
    dataIndex: "name",
    copyable: true
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    ellipsis: true,
    width: 100
  },
  {
    title: "money",
    dataIndex: "money",
    valueType: "money"
  },
  {
    title: "date",
    key: "date",
    dataIndex: "date",
    valueType: "date"
  },
  {
    title: "dateTime",
    key: "dateTime",
    dataIndex: "date",
    valueType: "dateTime"
  },
  {
    title: "time",
    key: "time",
    dataIndex: "date",
    valueType: "time"
  },
  {
    title: "option",
    valueType: "option",
    dataIndex: "id",
    render: (text, row, index, action) => [
      <a
        onClick={() => {
          window.alert("确认删除？");
          action.reload();
        }}
      >
        delete
      </a>,
      <a
        onClick={() => {
          window.alert("确认刷新？");
          action.reload();
        }}
      >
        reload
      </a>
    ]
  }
];

const data: {
  key: string | number;
  name: string;
  age: string | number;
  address: string;
  money: number;
  date: number;
}[] = [];
for (let i = 0; i < 46; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 10 + i,
    money: parseFloat((10000.26 * (i + 1)).toFixed(2)),
    date: moment("2019-11-16 12:50:26").valueOf() + i * 1000 * 60 * 2,
    address: `London, Park Lane no. ${i}`
  });
}

const request = (): Promise<{
  data: {
    key: string | number;
    name: string;
    age: string | number;
    address: string;
  }[];
  success: true;
}> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data,
        success: true
      });
    }, 1000);
  });

function App() {
  const [keyword, setKeyword] = React.useState<string>("");
  return (
    <ProTable
      className="App"
      size="small"
      columns={columns}
      request={request}
      rowKey="key"
      params={{ keyword }}
      renderToolBar={action => [
        <Input.Search
          style={{
            width: 200
          }}
          onSearch={value => setKeyword(value)}
        />,
        <Button
          onClick={() => {
            action.reload();
          }}
          type="primary"
        >
          刷新
        </Button>,
        <Button
          onClick={() => {
            action.resetPageIndex();
          }}
          type="default"
        >
          回到第一页
        </Button>
      ]}
      pagination={{
        defaultCurrent: 10
      }}
    />
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
