import axios from "axios";
import { useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";

const BmiCalculator = () => {
  const toast = useRef(null);
  const { user } = useAuthContext();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [bmiStatus, setBmiStatus] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const showInfo = (bmi, status) => {
    if (status === "Obese") {
      toast.current.show({
        severity: "warn",
        summary: "Your BMI is:",
        detail: bmi + ", " + status,
        life: 4000,
      });
      return;
    } else {
      toast.current.show({
        severity: "success",
        summary: "Your BMI is:",
        detail: bmi + ", " + status,
        life: 8000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login first.");
      return;
    }

    const bmiInfo = { height, weight, sex, age };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/calculate/bmi`,
        bmiInfo,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const bmiArray = response.data.bmis;
      const bmiValues = bmiArray.map((entry) => entry.bmi);
      const dates = bmiArray.map((entry) =>
        new Date(entry.date).toLocaleDateString()
      );
      const data = {
        labels: dates,
        datasets: [
          {
            label: "BMI",
            data: bmiValues,
            backgroundColor: ["rgba(255, 159, 64, 0.2)"],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 3,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      setChartData(data);
      setChartOptions(options);

      if (response.status === 200) {
        setError(null);
        setBmi(response.data.bmi);
        setBmiStatus(response.data.bmiStatus);
        showInfo(response.data.bmi, response.data.bmiStatus);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex content-center flex-col items-center mx-auto ">
      <Toast ref={toast} position="center" />
      <form
        onSubmit={handleSubmit}
        className=" p-4 mx-auto w-2/5 border-2 bg-white rounded-3xl "
      >
        <h3 className="text-3xl  text-center text-form_title  font-semibold mb-5">
          BMI Calculator
        </h3>
        <label>Please enter your Height (in cm): </label>
        <InputNumber
          className="block"
          value={height}
          onChange={(e) => setHeight(e.value)}
        />
        <label>Please enter your Weight (in kg):</label>
        <InputNumber
          className="block"
          onChange={(e) => setWeight(e.value)}
          value={weight}
        />
        <div className="flex flex-wrap gap-3">
          <label>Please enter your Sex :</label>
          <div className="flex align-items-center">
            <RadioButton
              inputId="ingredient1"
              name="male"
              value="male"
              onChange={(e) => setSex(e.value)}
              checked={sex === "male"}
            />
            <label className="ml-2">male</label>
          </div>
          <div className="flex align-items-center">
            <RadioButton
              inputId="ingredient2"
              name="female"
              value="female"
              onChange={(e) => setSex(e.value)}
              checked={sex === "female"}
            />
            <label className="ml-2">female</label>
          </div>
        </div>

        <div className=" justify-center  items-center">
          <label className="  mb-2">Please enter your age: </label>
          <InputNumber
            inputId="minmax-buttons"
            value={age}
            className="w-2/12"
            onValueChange={(e) => setAge(e.value)}
            mode="decimal"
            min={1}
            max={100}
          />
        </div>

        <button className="bg-primary text-white p-4 font-poppins rounded-lg cursor-pointer">
          Submit
        </button>

        {bmi && (
          <div className="bg-slate-200 p-4 mt-2 rounded border-3">
            Your Bmi is: <span className="font-bold">{bmi} </span>, Your result
            suggests you are <span className="font-bold"> {bmiStatus}</span>
            <Button
              label="Show bmi chart"
              type="button"
              className="bg-lime-600 text-white p-1 font-poppins rounded-lg cursor-pointer"
              icon="pi pi-external-link"
              onClick={() => setVisible(true)}
            />
            <Dialog
              header="Bmi History chart "
              visible={visible}
              style={{
                width: "45vw",
              }}
              onHide={() => setVisible(false)}
            >
              <div className="card">
                <Chart
                  type="bar"
                  data={chartData}
                  options={chartOptions}
                  style={{ width: "140%" }}
                />
              </div>
            </Dialog>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </form>

      <div className=" mt-2 p-10 bg-blue-100 shadow-md rounded-3xl border-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold mb-4">BMI weight ranges</h1>

          <p>
            A BMI calculation in the healthy weight range is between 18.5 to
            24.9
          </p>
          <ul className="list-disc ml-5">
            <li className="text-lg text-green-600">
              Below 18.5 is underweight
            </li>
            <li className="text-lg text-blue-600">
              Between 18.5 and 24.9 is healthy
            </li>
            <li className="text-lg text-yellow-600">
              Between 25 and 29.9 is overweight
            </li>
            <li className="text-lg text-red-600">Of 30 or over is obese</li>
          </ul>
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4">BMI results</h2>

          <div className="mb-4">
            <h3
              className="text-lg font-semibold text-blue-600"
              data-block-key="0xm2q"
            >
              Underweight
            </h3>
            <p className="text-gray-700" data-block-key="8c0mu">
              Being underweight could be a sign you're not eating enough or you
              may be ill. If you're underweight, a GP can help.
            </p>
            <p className="text-gray-700" data-block-key="ba1ov">
              <a
                href="https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/advice-for-underweight-adults/"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find out more in underweight adults
              </a>
            </p>
            <p className="text-gray-700" data-block-key="96llb">
              If you have an{" "}
              <a
                href="https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/eating-disorders/overview/"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                eating disorder
              </a>
              , the BMI calculation results do not apply. Please get further
              advice from a GP.
            </p>
          </div>

          <div className="mb-4">
            <h3
              className="text-lg font-semibold text-green-600"
              data-block-key="48bk8"
            >
              Healthy weight
            </h3>
            <p className="text-gray-700" data-block-key="7u8mf">
              Find out more about having a{" "}
              <a
                href="https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                balanced diet.
              </a>{" "}
              you can try at home to maintain a healthy weight.
            </p>
          </div>

          <div className="mb-4">
            <h3
              className="text-lg font-semibold text-yellow-600"
              data-block-key="5hbn8"
            >
              Overweight
            </h3>
            <p className="text-gray-700" data-block-key="ajcgd">
              If you want to lose weight, you can find more information at{" "}
              <a
                href="https://www.nhs.uk/better-health/lose-weight/"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NHS Better Health
              </a>
              .
            </p>
          </div>

          <div className="mb-4">
            <h3
              className="text-lg font-semibold text-red-600"
              data-block-key="b9648"
            >
              Obese
            </h3>
            <p className="text-gray-700" data-block-key="beept">
              You may want to see a GP for help and advice.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BmiCalculator;
