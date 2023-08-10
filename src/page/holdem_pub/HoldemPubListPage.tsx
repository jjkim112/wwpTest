import { useState } from 'react';
import Slick from '../../utils/slider/Slick';
import './holdemPub.css';

function HoldemPubListPage() {
  const pubList = [
    {
      imgUrl: '/assets/images/wp_title.gif',
      pubName: '슈에뜨 펍',
      place: '제주',
      popularityType: '인기좋음',
      starRating: 5.0,
      content: 'djsakljdaklsjdlsajdjlksajdlajsldjlsajdasdasdasdasdsa',
    },
    {
      imgUrl: '/assets/images/background.png',
      pubName: '럭키 라운지펍',
      place: '제주',
      popularityType: '신규',
      starRating: 4.0,
      content: 'djsakljdaklsjdlsajdjlksajdlajsldjlsajdasdasdasdasdsa',
    },
    {
      imgUrl: '/assets/images/background.png',
      pubName: '럭키 스튜디오',
      place: '제주',
      popularityType: 'best2',
      starRating: 3.2,
      content: 'djsakljdaklsjdlsajdjlksajdlajsldjlsajdasdasdasdasdsa',
    },
    {
      imgUrl: '/assets/images/background.png',
      pubName: '제주',
      place: '제주',
      popularityType: null,
      starRating: 2.2,
      content: 'djsakljdaklsjdlsajdjlksajdlajsldjlsajdasdasdasdasdsa',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className=" p-12">
        <div className="text-3xl font-bold text-white">최근 인기 지점</div>
        <Slick>
          {pubList.map((item, index) => (
            <div
              className=" flex flex-col justify-center items-center  w-full p-10 "
              key={index}
            >
              <div className="">
                <div className=" h-[300px] overflow-hidden  rounded-tl-md rounded-tr-md ">
                  <img
                    src={item.imgUrl}
                    alt={item.place}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="bg-slate-500 rounded-bl-md rounded-br-md p-5">
                  <div className="flex justify-around  w-full">
                    <p className="w-2/3 text-3xl font-bold text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap ">
                      {item.pubName}
                    </p>
                    <div className="flex items-center justify-center  w-1/3 ">
                      <div className="w-full text-xl font-bold text-gray-800 bg-blue-400 rounded-xl text-center">
                        {item.place}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full pt-5">
                    <p className="w-2/3  font-bold text-gray-800 text-3xl">
                      <span>⭐</span>
                      {item.starRating.toString()}
                    </p>
                    {item.popularityType ? (
                      <div className="flex items-center justify-center  w-1/3 ">
                        <div className="w-full text-xl font-bold text-gray-800 bg-blue-400 rounded-xl text-center">
                          {item.popularityType}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slick>
        <section>
          <div className="text-3xl font-bold text-white">홈덤 지점</div>
          <div className="flex flex-col">
            {pubList.map((item, index) => (
              <div
                className=" flex flex-row   w-full  h-[300px]  p-10 "
                key={index}
              >
                <div className=" w-1/4 h-full">
                  <div className=" h-full overflow-hidden  rounded-tl-md rounded-bl-md ">
                    <img
                      src={item.imgUrl}
                      alt={item.place}
                      className="w-full h-full object-fill"
                    />
                  </div>
                </div>
                <div className="w-2/4 h-full ">
                  <div className="bg-slate-500 h-full  p-5 ">
                    <div className="relative flex justify-around  w-full">
                      <p className=" text-4xl  font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap py-2 ">
                        {item.pubName}
                      </p>
                      <div className="absolute  top-0 left-0  w-1/4   ">
                        <div className="w-full text-3xl font-bold text-white bg-blue-400 rounded-xl text-center p-2">
                          {item.place}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-start w-full pt-5">
                      <p className="flex w-1/3 font-bold text-center  items-center justify-center  text-gray-800 text-3xl">
                        <span>⭐</span>
                        {item.starRating}
                      </p>
                      {item.content ? (
                        <div className="w-full text-xl font-bold text-gray-800 textCut">
                          {item.content}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" w-1/4 h-full">
                  <div className=" bg-slate-500 h-full rounded-tr-md rounded-br-md p-5 ">
                    <img
                      src={item.imgUrl}
                      alt={item.place}
                      className="w-full h-full object-fill"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default HoldemPubListPage;
