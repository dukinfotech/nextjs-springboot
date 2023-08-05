"use client";

import BackButton from "@/components/admin/Button/BackButton";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ChangeLogPage() {
  return (
    <Card className="max-w-full">
      <CardHeader className="flex justify-between">
        <div className="text-xl font-bold text-gray-800">Change log</div>
        <BackButton />
      </CardHeader>
      <Divider />
      <CardBody className="max-w-[800px] pl-10">
        <ol className="list-decimal italic">
          <li>Comprehensive Role & Permission mechanism</li>
          <li>Data change tracking</li>
        </ol>
      </CardBody>
    </Card>
  );
}
