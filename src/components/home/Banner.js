import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { styled } from 'styled-components'

const StyleSlide = styled(SwiperSlide)`
    position: relative;
    img{width: 100%; height: 100%;}
`
const DescContent = styled.div`
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    h3{
        text-align: center;
        font-size: 48px;
        @media screen and (max-width: 768px) {
            font-size: 16px;
        }
        @media screen and (max-width: 1280px) {
            font-size: 30px;
        }
    }
    p{
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        @media screen and (max-width: 768px) {
            font-size: 14px;
        }
        @media screen and (max-width: 1280px) {
            font-size: 20px;
        }
    }
`


function Banner() {
  return (
    <>
        <Swiper 
            autoplay={{
                delay : 3000,
                disableOnInteraction: false
            }}
            loop={true}
            // 무한으로 돌아감
            slidesPerView={1}
            // 화면에 보이는 슬라이드 갯수
            navigation={{clickable: true}}
            // 화살표
            pagination={{clickable: true}}
            // 슬라이드 밑에 작은 동그라미
            modules={[Autoplay, Navigation, Pagination]}
        >
            {
                Array(5).fill().map((e,i)=>{
                    return(
                        <StyleSlide key={i}>
                            <img src={`./images/${i+1}.jpg`} alt="slide" />
                            <DescContent>
                                <h3>강조하는 제목</h3>
                            </DescContent>
                        </StyleSlide>
                    )
                })
            }
        </Swiper>
    </>
  )
}

export default Banner