import { styles } from '@/app/styles/styles'
import Image from 'next/image'
import React from 'react'
import ReviewsCard from '../Reviews/ReviewsCard'

type Props = {}

export const reviews = [
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
    {
        name:"Gene Bates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student",
        comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate neque consequatur harum tempore, ab optio iure magni adipisci quisquam aut earum voluptatibus accusantium! Praesentium minus expedita voluptas, ipsam veniam perferendis nihil eligendi. "
    },
]

function Reviews({}: Props) {
  return (
    <div className="w-[90%] md:w-[85%] m-auto ">
        <div className="w-full md:flex items-center">
            <div className="md:w-[50%] w-full ">
                <Image 
                    src={require("../../../public/image.png")}
                    alt={"business"}
                    width={600}
                    height={600}
                />
            </div>
            <div className="md:w-[50%] w-full ">
                <h3 className={`${styles.title} md:!text-[40px]`}>
                    Our Students Are <span className="text-gradient">Our Strength</span>{" "}
                    <br />See What They Say About Us
                </h3>
                <br />
                <p className={`${styles.label}`}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni assumenda reiciendis optio culpa? Delectus, minima consequatur adipisci molestias a quia soluta exercitationem blanditiis earum, facere cum. Provident, ea delectus, consequatur dolorum atque animi velit praesentium obcaecati eum a et harum nobis neque fuga at suscipit!
                </p>
            </div>
            <br />
            <br />
        </div>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child()]:!mt-[-40px] ">
                {
                    reviews && 
                    reviews.map((i,index)=> <ReviewsCard item={i} key={index} />)
                }
            </div>
    </div>
  )
}

export default Reviews