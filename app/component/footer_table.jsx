"use client"
const InfoTable = () => {
  const data = {
    Platform: ["Form", "Scholarship", "Premium"],
    Company: ["Blog", "Careers", "News"],
    Legal: ["Privacy Policy", "Terms of Services", "Cookies"]
  };

  const links = {
    Form: "#form",
    Scholarship: "#scholarship",
    Premium: "#premium",
    Blog: "#blog",
    Careers: "#careers",
    News: "#news",
    "Privacy Policy": "#privacy-policy",
    "Terms of Services": "#terms-of-services",
    Cookies: "#cookies"
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Object.keys(data).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(3)].map((_, index) => (
            <tr key={index}>
              {Object.keys(data).map((key) => (
                <td key={key}>
                  <a href={links[data[key][index]]}>{data[key][index]}</a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        table {
          width: 75vh;
          text-align: left;
          border-collapse: collapse;
          item-align: right;
        }
        thead {
          font-weight: bold;
          color: #333;
          font-size: 1.2rem;
        }
        th, td {
          padding: 0.5rem 0;
        }
        a {
          text-decoration: none;
          color: #555;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default InfoTable;