import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface ChartContainerProps {
  src: string
  alt: string
  legend?: Array<{
    color: string
    label: string
  }>
  title?: string
}

export function ChartContainer({ src, alt, legend, title }: ChartContainerProps) {
  return (
    <Card className="p-8 mb-8 bg-white border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm">
      <CardContent className="p-0">
        {title && (
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2 drop-shadow-md">{title}</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto shadow-md"></div>
          </div>
        )}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            priority={false}
          />
        </div>
        {legend && (
          <div className="flex justify-center mt-6 gap-8 flex-wrap">
            {legend.map((item, index) => (
              <div key={index} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                <div 
                  className="w-5 h-5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-muted-foreground drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}



