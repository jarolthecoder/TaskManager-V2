"use client"

import { Table } from "@/components/ui"

export const ProjectsTable = () => {
  return (
    <Table
      columns={["Project", "Status", "Tasks", "Members"]}
      data={[
        {
          project: "Project 1",
          status: "In Progress",
          tasks: 5,
          members: 3,
        },
        {
          project: "Project 2",
          status: "Completed",
          tasks: 10,
          members: 5,
        },
        {
          project: "Project 3",
          status: "Pending",
          tasks: 2,
          members: 1,
        },
      ]}
      />
  )
}
