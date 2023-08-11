import { useEffect, useState } from 'react';
import Slick from '../../utils/slider/Slick';
import './holdemPub.css';
import { redirect } from 'react-router-dom';
import { HoldemPubOnePage } from './pub_page/HoldemPubOnePage';
import { useNavigate } from 'react-router-dom';
import { Pub } from '../../domain/Pub.model';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { DataService } from '../../data/DataService';
import { refreshWholePub } from '../../reducer/pubSlice';
import { refreshGames } from '../../reducer/gameSlice';

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

export function HoldemPubPage() {
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const gamesData = useSelector((state: RootState) => state.game.games);

  const dispatch = useDispatch<AppDispatch>();

  const _initFunc = async () => {
    const wholeData = await DataService.fetchWholePub();
    dispatch(refreshWholePub(wholeData));
  };
  useEffect(() => {
    _initFunc();
  }, []);

  const goToPubPage = async (pub: Pub) => {
    setPickPub(pub.clone);
    const getGameData = await DataService.fetchGamesInfo(pub.id);
    dispatch(refreshGames(getGameData));
  };
  if (pickPub !== null)
    return HoldemPubOnePage(pickPub, gamesData, () => {
      setPickPub(null);
    });

  return (
    <div className="flex flex-col">
      <section className="p-12">
        <div className="text-2xl font-bold text-white pb-2">최근 인기 지점</div>
        <Slick>
          {pubsData.map((pubData, index) => (
            <div
              className=" flex flex-col justify-center items-center  w-full  "
              key={index}
              onClick={() => {
                goToPubPage(pubData);
              }}
            >
              <div className="">
                <div className=" h-[300px] overflow-hidden  rounded-tl-md rounded-tr-md ">
                  <img
                    src={pubData.photos[0] ?? '/assets/images/background.png'}
                    alt={pubData.name}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="bg-slate-500 rounded-bl-md rounded-br-md p-5">
                  <div className="flex justify-around  w-full">
                    <p className="w-2/3 h-16 text-xl  font-bold text-gray-800 text-ellipsis overflow-hidden   box-content line-clamp-2   ">
                      {pubData.name}
                    </p>
                    <div className="flex items-center justify-center  w-1/3 ">
                      <div className="w-full text-base font-bold text-gray-800 bg-blue-400 rounded-xl text-center">
                        {pubData.address.substring(0, 2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full pt-5">
                    <p className="w-2/3  font-bold text-gray-800 text-xl">
                      <span>⭐</span>
                      {5.0}
                    </p>
                    {true ? (
                      <div className="flex items-center justify-center  w-1/3 ">
                        <div className="w-full text-base font-bold text-gray-800 bg-blue-400 rounded-xl text-center">
                          {'가장좋음'}
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
          <div className="text-3xl font-bold text-white pb-2">홈덤 지점</div>
          <div className="flex flex-col items-center">
            {pubsData.map((pubData, index) => (
              <div
                className=" flex flex-col justify-center items-center  w-full pb-2  "
                key={index}
                onClick={() => {
                  goToPubPage(pubData);
                }}
              >
                <div className="">
                  <div className=" h-[300px] overflow-hidden  rounded-tl-md rounded-tr-md ">
                    <img
                      src={pubData.photos[0] ?? '/assets/images/background.png'}
                      alt={pubData.name}
                      className="w-full h-full object-fill"
                    />
                  </div>
                  <div className="bg-slate-500 rounded-bl-md rounded-br-md p-5">
                    <div className="flex justify-around  w-full">
                      <p className="w-2/3 h-16 text-xl  font-bold text-gray-800 text-ellipsis overflow-hidden   box-content line-clamp-2   ">
                        {pubData.name}
                      </p>
                      <div className="flex items-center justify-center  w-1/3 ">
                        <div className="w-full text-base font-bold text-gray-800 bg-blue-400 rounded-xl text-center">
                          {pubData.address.substring(0, 2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between w-full pt-5">
                      <p className="w-2/3  font-bold text-gray-800 text-xl">
                        <span>⭐</span>
                        {5.0}
                      </p>
                      {true ? (
                        <div className="flex items-center justify-center  w-1/3 ">
                          <div className="w-full text-base font-bold text-gray-800 bg-blue-400 rounded-xl text-center">
                            {'가장좋음'}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              // <div className="w-full h-[calc(360px/2)]  p-2" key={index}>
              //   <div className="flex flex-row w-full h-full">
              //     <div className="w-1/4 h-full">
              //       <div className="h-full overflow-hidden rounded-tl-md rounded-bl-md">
              //         <img
              //           src={
              //             pubData.photos[0] ?? '/assets/images/background.png'
              //           }
              //           alt={pubData.name}
              //           className="w-full h-full object-fill"
              //         />
              //       </div>
              //     </div>
              //     <div className="w-2/4 h-full">
              //       <div className="bg-slate-500 h-full p-5">
              //         <div className="relative flex justify-around">
              //           <p className="text-xl font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap py-2">
              //             {pubData.name}
              //           </p>
              //           <div className="absolute top-0 left-0 w-1/4">
              //             <div className="w-full text-3xl font-bold text-white bg-blue-400 rounded-xl text-center p-2">
              //               {pubData.address}
              //             </div>
              //           </div>
              //         </div>

              //         <div className="flex items-center justify-start w-full pt-5">
              //           <p className="flex w-1/3 font-bold text-center items-center justify-center text-gray-800 text-3xl">
              //             <span>⭐</span>
              //             {5.0}
              //           </p>
              //           {true ? (
              //             <div className="w-full text-xl font-bold text-gray-800 truncate">
              //               {'adgdfsfd'}
              //             </div>
              //           ) : (
              //             <div></div>
              //           )}
              //         </div>
              //       </div>
              //     </div>

              //     <div className="w-1/4 h-full">
              //       <div className="bg-slate-500 h-full rounded-tr-md rounded-br-md p-5">
              //         <img
              //           src={
              //             pubData.photos[1] ?? '/assets/images/background.png'
              //           }
              //           alt={pubData.name}
              //           className="w-full h-full object-fill"
              //         />
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
