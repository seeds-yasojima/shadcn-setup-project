import {
  Tabs,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs"
import { CustomTabsTrigger } from "./custom-tabs-trigger"

export function TabsDemo() {
  return (
    <Tabs defaultValue="message" className="w-full max-w-2xl">
      <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 rounded-none">
        <CustomTabsTrigger value="message">
          メッセージ
        </CustomTabsTrigger>
        <CustomTabsTrigger value="canvas">
          canvas を追加する
        </CustomTabsTrigger>
        <CustomTabsTrigger value="file">
          ファイル
        </CustomTabsTrigger>
      </TabsList>
      <TabsContent value="message" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">権限</h3>
          {/* Add your message content here */}
        </div>
      </TabsContent>
      <TabsContent value="canvas" className="mt-4">
        <div className="space-y-4">
          {/* Add your canvas content here */}
        </div>
      </TabsContent>
      <TabsContent value="file" className="mt-4">
        <div className="space-y-4">
          {/* Add your file content here */}
        </div>
      </TabsContent>
    </Tabs>
  )
}

