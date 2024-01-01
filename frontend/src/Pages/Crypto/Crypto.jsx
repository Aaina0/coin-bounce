import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { getCrypto } from "../../api/external";

function Crypto() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // IIFE: immediately invoked function expression
    (async function cryptoApiCall() {
      const response = await getCrypto();
      setData(response);
    })();

    // Cleanup
    setData([]);
  }, []);

  if (data.length === 0) {
    return <Loader text="crytocurrenices" />;
  }

  const negativeStyle = {
    color: "#ea3943",
  };

  const positiveStyle = {
    color: "#16c784",
  };

  return (
    <table
      style={{
        width: "80%",
        margin: "20px auto",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: "#f2f2f2",
          }}
        >
          <th
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              padding: "12px",
            }}
          >
            #
          </th>
          <th
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              padding: "12px",
            }}
          >
            Coin
          </th>
          <th
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              padding: "12px",
            }}
          >
            Symbol
          </th>
          <th
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              padding: "12px",
            }}
          >
            Price
          </th>
          <th
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              padding: "12px",
            }}
          >
            24h
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr
            id={coin.id}
            style={{
              borderBottom: "1px solid #f2f2f2",
              padding: "8px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            <td>{coin.market_cap_rank}</td>
            <td>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                  gap: "40px",
                  textAlign: "left",
                  margin: "0 auto",
                }}
              >
                <img src={coin.image} width={40} height={40} /> {coin.name}
              </div>
            </td>
            <td>
              <div
                style={{
                  width: "30px",
                  display: "flex",
                  margin: "0 auto",
                  justifyContent: "center",
                }}
              >
                {coin.symbol}
              </div>
            </td>
            <td>{coin.current_price}</td>
            <td
              style={
                coin.price_change_percentage_24h < 0
                  ? negativeStyle
                  : positiveStyle
              }
            >
              {coin.price_change_percentage_24h}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Crypto;
