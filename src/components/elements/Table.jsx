import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateData } from "../../reducers/data";

import { HiFilter } from "react-icons/hi";

import notepad from "../../assets/notepad.svg";
import icon from "../../assets/app_icon.png";

const Table = ({ dataSecondHeader, valueToRemove }) => {
  const dataView = useSelector((state) => state.data.value);
  const tableDataView = useSelector((state) => state.tableHead.value);
  const tableDataSort = useSelector((state) => state.dataSort.value);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(
      [...dataView].sort((a, b) => {
        return removeComma(a.responses) - removeComma(b.responses);
      })
    );
  }, [dataView]);

  const removeComma = (x) => {
    return parseInt(x.replace(/\,/g, ""));
  };

  const responseSortting = () => {
    const responseSort = [...dataView].sort((a, b) => {
      return removeComma(a.responses) - removeComma(b.responses);
    });
    dispatch(dateData(responseSort));
    console.log(dateData);
  };
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openRange, setOpenRange] = React.useState(false);
  const [openRangeActive, setOpenRangeActive] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [searchInputt, setSearchInputt] = React.useState("");
  const [rangeMax, setRangeMax] = React.useState(0);
  const handleInputRange = () => {
    setOpenRangeActive(true);
    setOpenRange(false);
  }
  const handleReset = () => {
    setOpenRange(false);
    setOpenRangeActive(false);
    setRangeMax(0);
  }
  const handleInput = () => {
    setOpenSearch(false);
    setSearchInput(searchInputt);
  };
  const handleFilter = (value) => {
    if (value === "app_name") {
      setOpenSearch(!openSearch);
    }
    if(value === "requests"){
      setOpenRange(!openRange);
      // setOpenRangeActive(false);
    }
    if (value === "responses") {
      responseSortting();
      console.log("ll");
    }
    if (value === "clicks") {
      console.log("ll");
    }
  };

  return (
    <div style={{ marginTop: "1.5%" }}>
      {dataView.length !== 0 && (
        <table
          width="100%"
          style={{
            borderBottom: "0.5px solid #fff",
            borderCollapse: "collapse",
            paddingRight: "100px",
          }}
        >
          <tr style={{ height: "50px" }}>
            {tableDataView
              .filter((item) => !valueToRemove.includes(item.value))
              .map((item, index) => (
                <th
                  key={index}
                  style={{
                    textAlign: index >= 2 ? "right" : "left",
                    position: "relative",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleFilter(item.value)}
                  >
                    <HiFilter color="#707070" />
                  </div>
                  <div
                    style={{
                      color: "#707070",
                      fontSize: "13.8px",
                      position: "relative",
                    }}
                  >
                    {item.header}
                  </div>
                  {openSearch && item.value === "app_name" && (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px 20px",
                        gap: "10px",
                        justifyContent: "space-between",
                        border: "2px solid #EAEAEA",
                        borderRadius: "6px",
                        minHeight: "100px",
                        position: "absolute",
                        top: "50px",
                      }}
                    >
                      <div style={{fontSize:'13px',color:'#1D1A1A'}}>Search App</div>
                      <div
                        style={{
                          display: "flex",
                          border: "2.5px solid #136FED",
                          borderRadius: "6px",
                          alignItems: "center",
                          padding: "5px 8px",
                          marginBottom: '10px',
                        }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setSearchInputt(e.target.value)}
                          placeholder="Search"
                          style={{
                            border: "none",
                            height: "100%",
                            display: "flex",
                            outline: "none",
                            fontFamily: "Lato, sans-serif",
                            color: "#757575",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <button
                        className="datePicker__button"
                        onClick={handleInput}
                        style={{
                          backgroundColor: "rgb(61, 145, 255)",
                          color: "#fff",
                          width: "40%",
                          alignSelf: "flex-end"
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {openRange && item.value === "requests" && (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        justifyContent: "space-between",
                        border: "2px solid #EAEAEA",
                        borderRadius: "6px",
                        minHeight: "100px",
                        position: "absolute",
                        top: "50px",
                        minWidth: "250px"
                      }}
                    >
                      <input type="range" name="range_request" id="range_request" min='0' max='1111111' 
                        onChange={(e)=>{
                          setOpenRangeActive(false);
                          setRangeMax(e.target.value);
                        }}
                      />
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:'10px',marginBottom:'20px',width:'98%',marginInline:'auto'}}><p style={{margin:'0',marginLeft:'5px'}}>0</p><p style={{margin:'0'}}>1111111</p></div>
                      <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row-reverse'}}>
                        <button
                          className="datePicker__button"
                          onClick={handleInputRange}
                          style={{
                            backgroundColor: "rgb(61, 145, 255)",
                            color: "#fff",
                            width: "30%",
                            alignSelf: "flex-end"
                          }}
                        >
                          Apply
                        </button>
                        <button
                          className="datePicker__button"
                          onClick={handleReset}
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            width: "30%",
                            alignSelf: "flex-end",
                            borderColor:'transparent'
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
                </th>
              ))}
          </tr>
          <tr
            style={{
              borderBottom: "0.5px solid #70707015",
              paddingBlock: "11.px",
              borderCollapse: "collapse",
              height: "45px",
              fontSize: "19px",
              color: "#212121",
            }}
          >
            {tableDataSort.map((item, index) => (
              <td
                key={`${item}-${index}`}
                style={{ textAlign: index >= 2 ? "right" : "left" }}
              >
                {dataSecondHeader[item]}
              </td>
            ))}
          </tr>
          {dataView
            .filter(v => v.app_name.toLowerCase().includes(searchInput.toLowerCase()))
            .filter(v => {
              if(openRangeActive){
                console.log(openRangeActive);
                return(Number(v.requests.split(',').join(""))<=Number(rangeMax))} 
              else return v
            })
            .map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "0.5px solid #70707015",
                  paddingBlock: "11.px",
                  borderCollapse: "collapse",
                  height: "37.5px",
                  color: "#1D1A1A",
                }}
              >
                {tableDataSort.map((itm, idx) => {
                  return (
                    <td
                      style={{
                        textAlign: idx >= 2 ? "right" : "left",
                        fontSize: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10.27px",
                          justifyContent: idx >= 2 ? "flex-end" : "flex-start",
                        }}
                      >
                        {idx === tableDataView.findIndex(v=>v.value==="app_name") && (
                          <img
                            src={icon}
                            style={{
                              aspectRatio: "1/1",
                              objectFit: "contain",
                              width: "25px",
                            }}
                            alt="icon"
                          />
                        )}
                        {item[itm]}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
        </table>
      )}
      {dataView.length === 0 && (
        <div
          style={{
            height: "50vh",
            width: "100%",
            borderRadius: "4px",
            background: "#F9F9F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
            fontSize: "20px",
            gap: "19.8px",
          }}
        >
          <div>
            <img src={notepad} style={{ width: "190px" }} alt="notepad" />
          </div>
          <div>
            <h2 style={{ fontSize: "25px", marginBlock: "17px" }}>
              Hey! Something’s off!
              <br /> We couldn’t display the given data.
            </h2>
            <p
              style={{ fontSize: "18px", fontWeight: "600", color: "#B9B9B9" }}
            >
              Try changing your your filters or selecting a different date.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
