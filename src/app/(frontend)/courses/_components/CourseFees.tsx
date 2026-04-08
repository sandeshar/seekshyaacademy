import React from 'react';

const CourseFees = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-slate-900 text-2xl font-bold mb-4 font-display">Fee Structure</h2>
                <p className="text-slate-600">Transparent pricing for your educational investment. No hidden costs.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-700">
                        <tr>
                            <th className="px-6 py-4 font-bold" scope="col">Component</th>
                            <th className="px-6 py-4 font-bold text-right" scope="col">Amount (NPR)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Registration Fee (One-time)</td>
                            <td className="px-6 py-4 text-right">5,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Tuition Fee (Full Course)</td>
                            <td className="px-6 py-4 text-right">35,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Study Materials & Books</td>
                            <td className="px-6 py-4 text-right">8,500</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">Library Access (6 Months)</td>
                            <td className="px-6 py-4 text-right">2,000</td>
                        </tr>
                        <tr className="bg-secondary/5">
                            <td className="px-6 py-4 font-bold text-primary text-base">Total Investment</td>
                            <td className="px-6 py-4 text-right font-bold text-primary text-base">NPR 50,500</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text-xs text-slate-400 mt-[-10px]">
                * Fees are subject to change. Installment plans available.
            </div>
        </div>
    );
};

export default CourseFees;

