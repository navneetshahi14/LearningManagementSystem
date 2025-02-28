import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
 
import { Label } from '@/components/ui/label'
import { ListFilter, Star } from 'lucide-react'
import React from 'react'

// type SliderProps = React.ComponentProps<typeof Slider>

const Filter = () => {
  return (
    <>
        <div className="w-[20%] h-[90vh] flex flex-col border-r-[1px] border-[#999] ">
            <h1 className=" flex text-xl items-center gap-5 uppercase px-4 py-2">Filter  <ListFilter /></h1>
            <div className="px-2 border-t-[1px] mx-2 border-[#999] py-4 gap-2 flex flex-col">
                <h1 className="text-lg font-bold">Ratings</h1>
                <div className="flex flex-col">
                    {
                        [5,4,3,2,1].map((k,index)=>{
                            return(
                                <div key={index} className="flex justify-start gap-5 items-center">
                                    <span >
                                        <input type="radio" name="rating" id={k+"rating"} />
                                    </span>
                                    <span className='flex w-[50%]'>
                                        {Array.from({ length: k }, (_, i) => (
                                            <Star key={i} size={20} color="yellow" fill="yellow" />
                                        ))}
                                    </span>
                                    <span className='text-xl flex items-center justify-center'>
                                        <Label htmlFor={k+"rating"}>{k} Stars</Label>
                                    </span>
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <div className="px-2 border-y-[1px] mx-2 border-[#999] py-4 gap-2 flex flex-col">
                <h1 className="text-lg font-bold">Price Range</h1>
                <div className="flex flex-col">
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className={cn("w-[100%] bg-[#999] rounded")}
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default Filter