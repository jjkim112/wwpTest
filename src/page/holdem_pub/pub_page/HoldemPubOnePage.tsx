import { Pub } from '../../../domain/Pub.model';
import { useState, useEffect } from 'react';
import { AiFillPhone, AiFillEnvironment } from 'react-icons/ai';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { DataService } from '../../../data/DataService';
import { refreshGames } from '../../../reducer/gameSlice';
import { Game } from '../../../domain/Game.model';
import { useNavigate, useParams } from 'react-router-dom';

export default function HoldemPubOnePage() {
  const id = useParams().id;
  const [pickPub, setPickPub] = useState<Pub | null>(null);
  const pubsData = useSelector((state: RootState) => state.pub.pubs);
  const gamesData = useSelector((state: RootState) => state.game.games);
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const goToPubPage = async () => {
    pubsData.map((v, i) => {
      if (v.id === id) {
        console.log(v.id);
        setPickPub(v);
      }
    });

    const getGameData = await DataService.fetchGamesInfo(id!);
    dispatch(refreshGames(getGameData));
  };

  useEffect(() => {
    goToPubPage();
  });
  if (pickPub != null) {
    return (
      <div key={`${pickPub.id}detail`} className="p-2 w-full text-white">
        <button
          className="border-2 bg-blue-700 text-black font-bold p-3 rounded-lg "
          onClick={() => {
            navigate('/holdem-pub');
          }}
        >
          ⬅️ 돌아가기
        </button>
        <div className="flex flex-col my-10 ">
          <img
            className=" w-[150px] h-[150px]"
            src={pickPub.photos[0]}
            alt="디테일 그림"
          />
          <div className="mt-1">
            <div>{pickPub.name}</div>
            <h3>
              <AiFillPhone className="inline" /> {pickPub.phone}
            </h3>
            <h3>
              <AiFillEnvironment className="inline" /> {pickPub.address}
            </h3>

            <div className="flex flex-row  m-2">
              <a href={`${pickPub.links[1].url}`}>
                <img
                  className="w-[50px] mr-4"
                  src="\assets\images\icon-instagram.png"
                  alt="instagram"
                />
              </a>
              <a href={`${pickPub.links[0].url}`}>
                <img
                  className="w-[50px]"
                  src="\assets\images\icon-kakao.png"
                  alt="kakao"
                />
              </a>
            </div>
          </div>
        </div>
        {gamesData.map((game, i) => {
          return (
            <div>
              <div>{game.entry}</div>
              <div>{game.players.toString()}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center  text-center p-10">
        <div> 잘못된 페인지 접근 입니다.</div>
        <br />
        <button className="bg-white" onClick={() => navigate('/holdem-pub')}>
          이전페이지로{' '}
        </button>
      </div>
    );
  }
}
