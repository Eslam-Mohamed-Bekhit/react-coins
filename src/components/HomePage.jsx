import React  ,{useState} from 'react';
import millify from 'millify';
import { Typography, Col, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const {Title}=Typography;
function HomePage() {
const {data:cryproList,isFetching}=useGetCryptosQuery(10);
const globalStates = cryproList?.data?.stats ;

if(isFetching) return 'loading...'
 return (
      <>
      <Title level={2} className="heading" > Global Crypto Stats</Title>
      <Row>
        <Col span={12} ><Statistic title="Total Cryptocurrencies" value={millify(globalStates?.total)}/></Col>
        <Col span={12} ><Statistic title="Total Exchanges" value={millify(globalStates?.totalExchanges)}/></Col>
        <Col span={12} ><Statistic title="Total Market Cap" value={millify(globalStates?.totalMarketCap)}/></Col>
        <Col span={12} ><Statistic title="Total 24h Volume" value={millify(globalStates?.total24hVolume)}/></Col>
        <Col span={12} ><Statistic title="Total Markets" value={millify(globalStates?.totalMarkets)}/> </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more" ><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container'">
        <Title level={2} className="home-title">Latest Crypto news</Title>
        <Title level={3} className="show-more" ><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
        <News simplified/>
      </>
  )
}

export default HomePage