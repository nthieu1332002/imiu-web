import React from "react";
import MealItem from "../../../components/MealItem/MealItem";
import {
  useGetMenuQuery,
  useGetTagsQuery,
} from "../../../store/services/menuApi";
import { useSelector } from "react-redux";
import "./styles.scss";
import Loading from "../../../components/Loading/Loading";
import banner from "../../../assets/images/imiu-menu.png";
import { Checkbox, Col, Input } from "antd";
import { useState } from "react";
import { useEffect } from "react";
const { Search } = Input;
const Menu = () => {
  const difficulty = [
    {
      id: 1,
      value: 1,
      name: "Tập sự 🐱",
    },
    {
      id: 2,
      value: 2,
      name: "Có kinh nghiệm 🤠",
    },
    {
      id: 3,
      value: 3,
      name: "Chuyên gia 😎",
    },
  ];
  const { accountId } = useSelector((state) => state.auth);
  console.log("accountid", accountId);
  const { data: dataTag } = useGetTagsQuery();
  const [searchString, setSearchString] = useState("");
  const [tags, setTags] = useState();
  const [dif, setDif] = useState([]);
  const { data, isLoading } = useGetMenuQuery({
    customerId: accountId ? accountId : "",
    name: searchString,
    difficulty: dif,
    tags: tags,
    pageNumber: 1,
    pageSize: 3,
  });
  console.log(dataTag?.data);
  console.log("data", data);
  console.log("tags", tags);
  console.log("dif", dif);
  useEffect(() => {
    if (dataTag) {
      setTags(dataTag.data);
    }
  }, [dataTag])
  const onSearch = (value) => {
    setSearchString(value);
  };
  const onChange = (checkedValues) => {
    setTags(checkedValues);
    console.log("checked = ", checkedValues);
  };
  const onChangeDifficulty = (checkedValues) => {
    setDif(checkedValues)
    console.log("checked = ", checkedValues);
  };
  
  return (
    <div className="menu">
      <div className="menu-banner">
        <img src={banner} alt="" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="menu-content">
            <h1>Chúng tôi liệt kê những món ăn phù hợp với cá nhân của bạn.</h1>
            <div className="menu-content__container">
              <div className="menu-content__filter">
                <h2>Tìm kiếm món ăn</h2>
                <Search
                  placeholder="Bạn muốn ăn gì ? 😛"
                  allowClear
                  onSearch={onSearch}
                  size="large"
                />
                <h3>Tìm kiếm theo độ khó</h3>
                <Checkbox.Group
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeDifficulty}
                  className="checkbox-list"
                  defaultValue={difficulty.map(item => item.id)}
                >
                  {difficulty.map((item, index) => {
                    return (
                      <Checkbox
                        key={index}
                        value={item.id}
                        className="checkbox-item"
                        
                      >
                        {item.name}
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
                <h3>Tìm kiếm theo loại</h3>
                <Checkbox.Group
                  style={{
                    width: "100%",
                  }}
                  onChange={onChange}
                  className="checkbox-list"
                  defaultValue={dataTag?.data.map(item => item)}
                >
                  {dataTag?.data.map((item, index) => {
                    return (
                      <Checkbox
                        key={index}
                        value={item}
                        className="checkbox-item"
                      >
                        {item.name}
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
              </div>
              <div className="menu-content__wrapper">
                {data?.data.map((item, index) => {
                  return (
                    <div key={index} className="menu-content__item">
                      <h3>Món {item.tag}</h3>
                      <div className="menu-content__item__list">
                        {item.data.map((item, index) => {
                          return <MealItem key={index} item={item} />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
