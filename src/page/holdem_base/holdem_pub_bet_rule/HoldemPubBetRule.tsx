import './HoldemPubBetRule.css';

export default function HoldemPubBetRule() {
  const position = [
    {
      title: '1. 버튼(Button,Btn)',
      content:
        '딜러 자리를 표시하는 버튼이 있어 버튼자리 이다. 가장 마지막에 배팅의 유무를 정할수 있는 가장 좋은 자리',
    },
    {
      title: '2. 스몰 블라인드(SmallBilind,SB)',
      content:
        '블라인드중 100/200 이라면 100을 의무적으로 배팅 해야하고 플랍이후 가장 먼저 액션 하는 자리입니다.',
    },
    {
      title: '3. 빅 블라이드(BigBlind,BB)',
      content:
        '블라인드중 100/200 이라면 200을 의무적으로 배팅 해야하고 앤티(Ante)가 있으면 앤티 금액 만큼 추가로 내야하는 자리입니다.',
    },
    {
      title: '4. 언더더건(Under thegun,UTG)',
      content:
        '총 바로앞이라는 뜻이며 프리플랍 가장 처음 액션하는 자리 입니다.',
    },
    {
      title: '5. 언더더건 + 1(UTG+1)',
      content: '언더더건 바로 앞자리 입니다.',
    },
    {
      title: '6. 미들포지션(Midlle position,MP)',
      content: '중간 위치에 있다고 하여 미들포지션 입니다.',
    },
    {
      title: '7. 로우 잭(Low jac,SB)',
      content:
        '늦게 베팅할수있는 위치 Late Position 첫번째 미들다음에 있으며 LJ이라고 불리고 미들포지션 중 하나이다.',
    },
    {
      title: '8. 하이 잭(High Jack,HJ)',
      content:
        '늦게 베팅할수있는 위치 Late Position 버튼보다 2번 앞에 있으며 HJ이라고 불리고 미들포지션 중 하나이다.',
    },
    {
      title: '9. 컷 오프(Cut off ,CO)',
      content: '늦게 베팅할수있는 위치 Late Position 버튼 바로 앞자리입니다.',
    },
  ];

  const second = [
    {
      title: '블라인드(Blind)',
      content: '빅, 스몰이 기본적으로 내야하는 금액 입니다.',
    },
    {
      title: '앤티(Ante)',
      content:
        '토너먼트에서 블라인드가 어느 순간까지 도달 했을 때 빅블라인드가 빅블라인드 금액만큼 추가로 내는 금액. 앤티 금액은 펍 마다 경우가 다양합니다.',
    },
    {
      title: '스몰 블라인드(Small Bilind,SB)',
      content:
        '블라인드중 100/200 이라면 100을 의무적으로 배팅 해야하고 플랍이후 가장 먼저 액션 하는 자리입니다.',
    },
    {
      title: '빅 블라이드(BigBlind,BB)',
      content:
        '블라인드중 100/200 이라면 200을 의무적으로 배팅 해야하고 앤티(Ante)가 있으면 앤티 금액 만큼 추가로 내야하는 자리입니다.',
    },
  ];
  const pot = [
    {
      title: '팟(Pot)',
      content: '테이블에 쌓여있는 돈.',
    },
  ];
  const call = [
    {
      title: '콜(call)',
      content:
        '콜은 레이즈한 금액 또는 의무배팅의 빅블라인드 만큼 콜을 해야 게임에 참여 할수 있습니다.',
    },
  ];
  const fold = [
    {
      title: '폴드 (Fold)',
      content: '게임을 포기하는 일.',
    },
  ];
  const small = [
    {
      title: '스몰 블라인드 행동',
      content:
        '상대가 레이즈한 금액이(400)일때 스몰 블라인드는 블라인드로 낸 금액 + 레이즈한 금액의 부족한 만큼',
    },
  ];
  const reRaise = [
    {
      title: '리-레이즈(Re-Raise)',
      content:
        '이미 레이즈 한 플레이 있는 상황에 내 차례에 또 레이즈 하는 상황을 말합니다.',
    },
    {
      title: '최소 리레이즈 금액:',
      content:
        '기본적으로 리레이즈는 최소한 이전 플레이어의 레이즈 금액만큼 증가해야 합니다. 예를 들어, 빅 블라인드가 200이고 첫 번째 레이즈한 플레이어가 400를 베팅했다면, 다음 플레이어가 레이즈하려면 적어도 200를 추가(600이상)로 베팅해야 합니다.',
    },
  ];
  const delEnd = [
    {
      title: '콜 한 상태',
      content:
        '레이즈 한 다음 플레이어 모두가 콜 한 상황이라면 프리플랍이 끝이 나고 플랍으로 가게 됩니다.',
    },
    {
      title: '다이 한 상태',
      content:
        '레이즈 한 다음 플레이어 모두가 다이를 한 상황이라면 게임은 끝이 나고 레이즈한 플레이어의 승리 입니다. 팟에 있는 돈을 가져오게 됩니다.',
    },
    {
      title: '최종 목표',
      content:
        '위 행동을 반복하여 모두가 폴드하여 한명 플레어가 남으면 승리 또는 턴을 지나 리버까지 가서 콜을 하여 패로 승부를 보는 방식입니다.',
    },
  ];
  const end = [
    {
      title: '콜,레이즈',
      content:
        '레이즈를 했거나 콜을 하게되면 팟에 쌓이게 됩니다. 폴드시에 내가 앞전에 콜을 했다면 콜한 금액을 팟에 쌓이게 됩니다.',
    },
    {
      title: '승리 후 지급',
      content: '승리한 플레이어에게 지급됩니다.',
    },
    {
      title: '승리 찹(비기는) 경우',
      content: '팟에 금액의 찹된 인원수 만큼 나눠 가지게 됩니다.',
    },
  ];

  return (
    <div className="p-2">
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'1. 홀덤 자리별 이름 (9 way)'}</h1>
          <img src="/assets/images/table_del/table1.png" alt="table1" />
          {position.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">
            {'2. 빅 ,스몰 블라인드 경우 행동요령'}
          </h1>
          <img src="/assets/images/table_del/table2.png" alt="table1" />
          {second.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'3. 테이블 팟'}</h1>
          <img src="/assets/images/table_del/table3.png" alt="table1" />
          {pot.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second"> {value.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'4. 행동요령(콜:Call)'}</h1>
          <img src="/assets/images/table_del/table4.png" alt="table1" />
          {call.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'5. 행동요령(레이즈:Raise)'}</h1>
          <img src="/assets/images/table_del/table5.png" alt="table1" />
          {call.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
          <p className="warning">
            주의. 6만을 베팅했다면 레이즈는 최소 12만부터 가능하다.
          </p>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'6. 행동요령(포기:Fold)'}</h1>
          <img src="/assets/images/table_del/table6.png" alt="table1" />
          {fold.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
          <p className="warning">
            주의. 펍 마다 폴드 할 수 있는 순서 룰이 다 를수 있습니다.
          </p>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'7. 스몰자리 행동요령'}</h1>
          <img src="/assets/images/table_del/table7.png" alt="table1" />
          {small.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
          <p className="text-white">
            참고. 스몰 블랑인드 금액 100 + 300 하여 레이즈금액을 맞추어 콜을
            할수 있습니다. 물론 레이즈도 가능 합니다.
          </p>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">
            {'8. 행동요령\n(리-레이즈:Re-Raise)'}
          </h1>
          <img src="/assets/images/table_del/table8.png" alt="table1" />
          {reRaise.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
          <p className="warning">
            주의. 베팅 라운드별 리레이즈 횟수 제한: 특정 포커 게임에서는 각 베팅
            라운드별 리레이즈 횟수에 제한이 있을 수 있습니다. 예를 들어, 각 베팅
            라운드에서 총 4번의 리레이즈가 허용된다고 가정하면, 이 상황에서는
            3번의 리레이즈만 가능하며, 4번째 리레이즈는 캡이라고 하며, 이후엔
            콜이나 폴드만 가능합니다.
          </p>
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">
            {'9. 행동요령\n(모두가 콜 또는 다이)'}
          </h1>
          <img src="/assets/images/table_del/table9.png" alt="table1" />
          {delEnd.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-3">
        <div className="article-container">
          <h1 className="article-title">{'10. 팟에 쌓이는 돈'}</h1>
          <img src="/assets/images/table_del/table10.png" alt="table1" />
          {end.map((value, index) => (
            <div key={index} className="content">
              <p>{value.title}</p>
              <p className="second">{value.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
