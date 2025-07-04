'use client';
// At the top of your file
import { useState, useEffect } from 'react';
const DURATION_OPTIONS = [
  { label: '1 month', value: 2 },
  { label: '2 months', value: 4 },
  { label: '3 months', value: 6 },
  { label: '4 months', value: 8 },
  { label: '5 months', value: 10 },
  { label: '6 months', value: 12 },
  { label: '7 months', value: 14 },
  { label: '8 months', value: 16 },
  { label: '9 months', value: 18 },
  { label: '10 months', value: 20 },
  { label: '11 months', value: 22 },
  { label: '12 months', value: 24 },
];

const SALARY_GRADES = [
  { grade: 1, monthlyRate: 12175, maxLoanableAmount: 37000 },
  { grade: 2, monthlyRate: 12937, maxLoanableAmount: 39000 },
  { grade: 3, monthlyRate: 13713, maxLoanableAmount: 41000 },
  { grade: 4, monthlyRate: 14535, maxLoanableAmount: 44000 },
  { grade: 5, monthlyRate: 15408, maxLoanableAmount: 46000 },
  { grade: 6, monthlyRate: 16323, maxLoanableAmount: 49000 },
  { grade: 7, monthlyRate: 17312, maxLoanableAmount: 52000 },
  { grade: 8, monthlyRate: 18434, maxLoanableAmount: 55000 },
  { grade: 9, monthlyRate: 19773, maxLoanableAmount: 59000 },
  { grade: 10, monthlyRate: 21156, maxLoanableAmount: 63000 },
  { grade: 11, monthlyRate: 22829, maxLoanableAmount: 68000 },
  { grade: 12, monthlyRate: 25232, maxLoanableAmount: 76000 },
  { grade: 13, monthlyRate: 27755, maxLoanableAmount: 83000 },
  { grade: 14, monthlyRate: 30531, maxLoanableAmount: 92000 },
  { grade: 15, monthlyRate: 33584, maxLoanableAmount: 101000 },
  { grade: 16, monthlyRate: 36942, maxLoanableAmount: 111000 },
  { grade: 17, monthlyRate: 38789, maxLoanableAmount: 116000 },
  { grade: 18, monthlyRate: 40637, maxLoanableAmount: 122000 },
  { grade: 19, monthlyRate: 45269, maxLoanableAmount: 136000 },
  { grade: 20, monthlyRate: 51155, maxLoanableAmount: 153000 },
  // { grade: 21, monthlyRate: 56319, maxLoanableAmount: 196000 },
  { grade: 22, monthlyRate: 65319, maxLoanableAmount: 196000 },
  // { grade: 23, monthlyRate: 73061, maxLoanableAmount: 230000 },
  { grade: 24, monthlyRate: 83406, maxLoanableAmount: 250000 },
];

const LoanCalculator = () => {
  const [loanedAmount, setLoanedAmount] = useState('');
  const [interestRate, setInterestRate] = useState(1);
  const [duration, setDuration] = useState('');
  const [salaryGrade, setSalaryGrade] = useState(1);
  const [totalAmountPayable, setTotalAmountPayable] = useState<number | null>(null);
  const [calculatedInterest, setCalculatedInterest] = useState<number | null>(null);
  const [monthlyAmortization, setMonthlyAmortization] = useState<number | null>(null);
  const [netTakeHome, setNetTakeHome] = useState<number | null>(null);
  const [amountError, setAmountError] = useState('');
  const [salaryPerCutOff, setSalaryPerCutOff] = useState<number | null>(null);

  const selectedGrade = SALARY_GRADES.find(grade => grade.grade === salaryGrade);
  const maxLoanableAmount = selectedGrade ? selectedGrade.maxLoanableAmount : 0;
  const monthlyRate = selectedGrade ? selectedGrade.monthlyRate : 0;

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoanedAmount(value);

    if (parseFloat(value) > maxLoanableAmount) {
      setAmountError(`Amount to borrow cannot exceed PHP ${maxLoanableAmount.toLocaleString()}`);
    } else if (parseFloat(value) < 1) {
      setAmountError('Amount to borrow must be at least PHP 1');
    } else {
      setAmountError('');
    }
  };

  const handleSalaryGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const grade = parseInt(e.target.value);
    setSalaryGrade(grade);
    setLoanedAmount('');
    setAmountError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amountError || !loanedAmount) return;

    const x = parseFloat(loanedAmount);
    const y = interestRate / 100;
    const z = parseInt(duration);

    const totalInterest = x * y;
    const totalInterestPerCutoff = totalInterest / 2;
    const totalAmountPayablePerCutoff = (x / z) + totalInterestPerCutoff;
    const monthlyAmort = totalAmountPayablePerCutoff * 2;
    const netTakeHome = monthlyRate - monthlyAmort;
    const salaryPerCutOff = netTakeHome / 2;

    setTotalAmountPayable(parseFloat(totalAmountPayablePerCutoff.toFixed(2)));
    setCalculatedInterest(parseFloat(totalInterest.toFixed(2)));
    setMonthlyAmortization(parseFloat(monthlyAmort.toFixed(2)));
    setNetTakeHome(parseFloat(netTakeHome.toFixed(2)));
    setSalaryPerCutOff(parseFloat(salaryPerCutOff.toFixed(2)));
  };

  useEffect(() => {
    const container = document.getElementById('bmc-button-container');
    if (container && !container.hasChildNodes()) {
      container.innerHTML = `
        <a href="https://www.buymeacoffee.com/devKom" target="_blank" rel="noopener" style="text-decoration:none;">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px; width: 217px;" />
        </a>
      `;
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
      script.setAttribute('data-name', 'bmc-button');
      script.setAttribute('data-slug', 'devKom');
      script.setAttribute('data-color', '#40DCA5');
      script.setAttribute('data-emoji', '');
      script.setAttribute('data-font', 'Cookie');
      script.setAttribute('data-text', 'Buy me a coffee');
      script.setAttribute('data-outline-color', '#000000');
      script.setAttribute('data-font-color', '#ffffff');
      script.setAttribute('data-coffee-color', '#FFDD00');
      script.async = true;
      container.appendChild(script);
    }
    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-black mb-6">PMBF Loan Calculator</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Salary Grade */}
          <div>
            <label htmlFor="salaryGrade" className="block text-gray-700 font-bold mb-2">Salary Grade:</label>
            <select
              id="salaryGrade"
              value={salaryGrade}
              onChange={handleSalaryGradeChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 mb-1"
            >
              {SALARY_GRADES.map((grade) => (
                <option key={grade.grade} value={grade.grade}>
                  Grade {grade.grade}
                </option>
              ))}
            </select>
            {/* Monthly Rate and Max Loanable */}
            {monthlyRate && (
              <div className="text-sm text-gray-700 mb-0">
                <div>Monthly Rate: <span className="font-medium text-indigo-600">PHP {monthlyRate.toLocaleString()}</span></div>
                <div>Maximum Loanable Amount: <span className="font-medium text-indigo-600">PHP {maxLoanableAmount.toLocaleString()}</span></div>
              </div>
            )}
          </div>


          {/* Loaned Amount */}
          <div>
            <label htmlFor="loanedAmount" className="block text-gray-700 font-bold mb-2">
              Amount to Borrow (PHP):
            </label>
            <input
              id="loanedAmount"
              type="number"
              value={loanedAmount}
              onChange={handleLoanAmountChange}
              placeholder={`Max: PHP ${maxLoanableAmount.toLocaleString()}`}
              min={1}
              max={maxLoanableAmount}
              required
              className={`w-full p-3 border ${amountError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${amountError ? 'focus:ring-red-400' : 'focus:ring-indigo-500'
                } text-gray-800 placeholder-gray-500 transition`}
            />
            {/* Error message */}
            {amountError && (
              <div className="text-sm text-red-600 mt-1 animate-pulse mb-0">
                {amountError}
              </div>
            )}
          </div>
          {/* Interest Rate */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Interest Rate:</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center text-gray-700">
                <input
                  type="radio"
                  name="interestRate"
                  value={1}
                  checked={interestRate === 1}
                  onChange={() => setInterestRate(1)}
                  className="form-radio"
                />
                <span className="ml-2">PBMF (1%)</span>
              </label>
              <label className="inline-flex items-center text-gray-700">
                <input
                  type="radio"
                  name="interestRate"
                  value={2}
                  checked={interestRate === 2}
                  onChange={() => setInterestRate(2)}
                  className="form-radio"
                />
                <span className="ml-2">Non-PBMF (2%)</span>
              </label>
            </div>
          </div>
          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">Contract Duration (in months):</label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            >
              <option value="">Select Duration</option>
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {duration && (
              <div className="text-xs text-gray-500 mt-1">
                Equivalent to {duration} cutoffs
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!!amountError}
            className={`w-full py-3 mt-4 font-semibold rounded-lg transition duration-300 ${amountError
              ? 'bg-red-400 cursor-not-allowed text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
          >
            Calculate
          </button>
        </form>
        {/* Results */}
        {(totalAmountPayable !== null || calculatedInterest !== null || monthlyAmortization !== null) && (
          <div className="mt-6 text-center space-y-2">
            {calculatedInterest !== null && (
              <div className="text-gray-700">
                <span className="font-medium">Calculated Interest: </span>
                <span className="text-indigo-600">PHP {calculatedInterest.toLocaleString()}</span>
              </div>
            )}
            {monthlyAmortization !== null && (
              <div className="text-gray-700">
                <span className="font-medium">Monthly Amortization: </span>
                <span className="text-indigo-600">PHP {monthlyAmortization.toLocaleString()}</span>
              </div>
            )}
            {/* {totalAmountPayable !== null && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Total Payable per Cutoff:</h3>
                <p className="text-lg text-indigo-600">PHP {totalAmountPayable.toLocaleString()}</p>
              </div>
            )} */}

            {totalAmountPayable !== null && (
              <div className="text-gray-700">
                <span className="font-medium">Quincena Deduction: </span>
                <span className="text-indigo-600">PHP {totalAmountPayable.toLocaleString()}</span>
              </div>
            )}

            {netTakeHome !== null && (
              <div className="text-gray-700">
                <span className="font-medium">Net Take Home (Monthly): </span>
                <span className="text-indigo-600">PHP {netTakeHome.toLocaleString()}</span>
              </div>
            )}

            {salaryPerCutOff !== null && (
              <div className="text-gray-700">
                <span className="font-medium">Salary per cutoff: </span>
                <span className="text-indigo-600">PHP {salaryPerCutOff.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}

        {/* BUY ME A COFFEE BTN */}
        <div id="bmc-button-container" className="flex justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default LoanCalculator;
