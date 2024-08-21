"use client"
import { useState } from "react"
import * as XLSX from "xlsx"
import Table from "~/components/Table"

export default function Home() {
  const [tableData, setTableData] = useState<any[][]>([])

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event?.target?.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target && e.target.result instanceof ArrayBuffer) {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: "array" })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          })

          setTableData(jsonData)
        }
      }

      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <div>
      <div className="py-5 text-center">
        <input
          className="rounded text-stone-500 file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
        />
      </div>
      <div className="px-10">
        <Table dataSource={tableData} />
      </div>
      <div className="px-10 text-right text-yellow-500">
        {!!tableData.length && <h3>總筆數： {tableData.length}</h3>}
      </div>
    </div>
  )
}
