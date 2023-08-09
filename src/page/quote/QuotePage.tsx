import QuoteOneItem from './QuoteOneItem';

const qoutesList = [
  {
    pokerQuote: '한판 보다, n판의 평균이 중요하다.',
    lifeQuote: '인생은 n번의 인피니티 게임이다.',
  },
  {
    pokerQuote: '이겼다고 좋아하고, 졌다고 화내는 포커는 리스크가 크다.',
    lifeQuote: '일희일비 하지 않는 자세가 중요하다.',
  },
  {
    pokerQuote: '풀하우스로 포카드에 질 수 있다.',
    lifeQuote: '나의 최선이 꼭 세상에 닿는다는 보장은 없다.',
  },
  {
    pokerQuote:
      '상대 패를 하나로 예측하는 것이 아니라, 핸드 레인지를 예상하라.',
    lifeQuote: '단편적인 사고가 아닌, 입체적인 사고로 세상을 바라보아라.',
  },
  {
    pokerQuote: '말보다는 상대의 베팅을 보아라.',
    lifeQuote: '인생은 말보다 행동이다.',
  },
];

const QuotePage = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col items-center justify-center grow h-full">
        {qoutesList.map((v, i) => {
          return (
            <QuoteOneItem
              key={i}
              pokerQuote={v.pokerQuote}
              lifeQuote={v.lifeQuote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuotePage;
