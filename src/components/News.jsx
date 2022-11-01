import React, { useState } from 'react';
import { Card, Avatar, Col, Row, Select, Typography } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import  demoImage from '../assets/demoimage.png'
import { useGetCryptosQuery } from '../services/cryptoApi';
const{ Text, Title } = Typography;
const { Option } = Select;

function News({simplified}) {
  const [newsCategory,setNewsCategory]= useState('CryptoCurrency')
  const {data : cryptoNews,isFetching}= useGetCryptoNewsQuery({newsCategory, count : simplified ? 6: 12});
  const {data} = useGetCryptosQuery(100)

  if(!cryptoNews?.value) return 'loading.......' 

  return (
    <Row gutter={[24,24]}>

      {!simplified &&
      <Col span={24}>
        <Select 
        showSearch
        className="select-news"
        placeholder="select a crypto"
        optionFilterProp="children"
        onChange={(value)=>setNewsCategory(value)}
        filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
        >
          <Option value="CryptoCurrency">CryptoCurrency</Option>
          {data?.data?.coins.map((coin)=>(
            <Option value={coin.name}>{coin.name}</Option>
          ))}
        </Select>
      </Col>
        }

      {cryptoNews?.value?.map((news,i)=>(
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer" >
              <div className="news-image-container">
                <Title className="news-title" level={4} >
                {news.description.length > 30 
                ? `${news.name.substring(0,30)}...` 
                : `${news.name} ##`}
                  </Title>
                  <img style={{maxWidth:'100px' , maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />

              </div>
              <p>
                {news.description.length > 80 
                ? `${news.description.substring(0,80)}...` 
                : `${news.description} ##`}
              </p>
              <div className="provider-conatiner" > 
                <div>
                  <Avatar  style={{maxWidth:'100px' , maxHeight:'100px'}}  src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="new"  />
                  <Text className="provider-name"> {news.provider[0]?.name} </Text>
                </div>
                <Text>{moment(news.datePuplished).startOf('ss').fromNow()}  </Text>
              </div>
            </a>
          </Card>
        
        </Col>
      ))}

    </Row>

    )
}

export default News