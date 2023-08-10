import { useState } from 'react';
import './HoldemTermsBase.css';
const terms = [
  {
    key: '가',
    item: [{ title: 'dsa', content: 'dsadsa' }],
  },
];

export default function HoldemTermsBase() {
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  return (
    <div className="common-container">
      <div className="page-header">
        <h2 className="title">홀덤 용어</h2>
      </div>

      <div className="term-info">
        <div></div>
        <div className="mt-16">
          {terms.map((value, i) => (
            <div key={i} className="category">
              <p className="title">{value.key}</p>
              <div className="list">
                <dl className="item">
                  {value.item.map((v, i) => (
                    <>
                      <dt className="tit">{v.title}</dt>
                      <dd className="con">{v.content}</dd>
                    </>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
