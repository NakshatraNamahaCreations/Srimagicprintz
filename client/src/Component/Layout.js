import React from "react";

export default function Layout() {
  return (
    <table id="invoiceTable" className="invoice_bill  col-md-12 mt-3">
      <tr>
        <th className="tdpadding">SI.NO.</th>
        <th className="tdpadding">Client Name</th>
        <th className="tdpadding" colspan={"2"}>
          Particulars
        </th>
        <th className="tdpadding">HSN/SAC Code</th>
        <th className="tdpadding">Brand Code</th>
        <th className="tdpadding" colSpan={""}>
          Element
        </th>
        <th className="tdpadding">Unit</th>
        <th className="tdpadding">Rate</th>
        <th className="tdpadding">Amount</th>
        <th className="tdpadding">IGST@18%</th>
        <th className="tdpadding">Billing details with GST</th>
        <th className="tdpadding">Shipping Address</th>
      </tr>
      <tr>
        <td rowSpan={"6"} className="tdpadding">
          1
        </td>
        <td rowSpan={"6"} className="tdpadding">
          Lenskart
        </td>
        <td rowSpan={"6"} className="tdpadding">
          AnnexureA
        </td>
        <td rowSpan={"6"} className="tdpadding">
          Porduction
        </td>
        <td rowSpan={"6"} className="tdpadding">
          3427618134
        </td>

        <td className="tdpadding">A3</td>
        <td className="tdpadding wider-td">
          Backlite Board With Tube light (single sides)
        </td>

        <td className="tdpadding">12 Sq.Ft</td>
        <td className="tdpadding">324/Sq.Ft</td>
        <td className="tdpadding">2,40,125.00</td>
        <td rowSpan={"6"} className="tdpadding">
          84,2342
        </td>
        <td rowSpan={"6"} className="tdpadding">
          gst
        </td>
        <td rowSpan={"6"} className="tdpadding">
          Address
        </td>
      </tr>
      <tr>
        <td className="tdpadding">A4</td>
        <td className=" wider-td">
          Backlite Board With Tube light (single sides)
        </td>

        <td className="tdpadding" style={{ padding: "15px" }}>
          12 Sq.Ft
        </td>
        <td className="tdpadding">324/Sq.Ft</td>
        <td className="tdpadding">2,40,125.00</td>
      </tr>
      <tr>
        <td className="tdpadding">A3</td>
        <td className=" wider-td">
          Backlite Board With Tube light (single sides)
        </td>

        <td className="tdpadding" style={{ padding: "15px" }}>
          12 Sq.Ft
        </td>
        <td className="tdpadding">324/Sq.Ft</td>
        <td className="tdpadding">2,40,125.00</td>
      </tr>
      <tr>
        <td className="tdpadding">C11</td>
        <td className=" wider-td">
          Backlite Board With Tube light (single sides)
        </td>

        <td className="tdpadding" style={{ padding: "15px" }}>
          12 Sq.Ft
        </td>
        <td className="tdpadding">324/Sq.Ft</td>
        <td className="tdpadding">2,40,125.00</td>
      </tr>
      <tr>
        <td className="tdpadding">A4</td>
        <td className=" wider-td">
          Backlite Board With Tube light (single sides)
        </td>

        <td className="tdpadding" style={{ padding: "15px" }}>
          12 Sq.Ft
        </td>
        <td className="tdpadding">324/Sq.Ft</td>
        <td className="tdpadding">2,40,125.00</td>
      </tr>
      <tr>
        <td className="tdpadding">A3</td>
        <td>Backlite Board With Tube light (single sides)</td>

        <td className="tdpadding" style={{ padding: "15px" }}>
          12 Sq.Ft
        </td>
        <td className="tdpadding">324/Sq.Ft</td>
        <td className="tdpadding">2,40,125.00</td>
      </tr>
      <tr>
        <td colSpan={"9"} className="text-center m-auto">
          Total
        </td>
        <td colSpan={"1"}>4,52,432.20</td>
        <td colSpan={"4"} className="text-center m-auto">
          87,234.90
        </td>
      </tr>{" "}
      <tr>
        <td colSpan={"9"} className="text-center m-auto"></td>
        <td colSpan={"1"} style={{ border: "none" }}>
          0.27
        </td>
        <td colSpan={"4"} className="text-center m-auto"></td>
      </tr>{" "}
      <tr>
        <td className="text-center m-auto" colSpan={"9"}>
          Grand total
        </td>

        <td colSpan={"4"}>4,56,342.80</td>
      </tr>
    </table>
  );
}
