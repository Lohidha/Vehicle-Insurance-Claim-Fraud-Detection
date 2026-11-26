import { useState, useMemo } from 'react';
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Generates a stable Claim ID for historical dataset rows based on their index.
 * Format: CLM-HIST-XXXXX — deterministic, identical on every render/refresh.
 */
function getHistoricalClaimId(index) {
  return `CLM-HIST-${String(index + 1).padStart(5, '0')}`;
}

export default function ClaimsView({ data, title, subtitle, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const rowsPerPage = 25;

  // Attach stable Claim IDs to each row once, based on original index in the full dataset
  const dataWithIds = useMemo(() => {
    return data.map((row, idx) => ({
      ...row,
      _claimId: row._claimId || getHistoricalClaimId(idx),
    }));
  }, [data]);

  const detailColumns = [
    { header: 'Claim ID', accessor: (row) => row._claimId },
    { header: 'Age', accessor: (row) => row.Age || 'Not Available' },
    { header: 'Gender', accessor: (row) => row.Sex || 'Not Available' },
    { header: 'Marital Status', accessor: (row) => row.MaritalStatus || 'Not Available' },
    { header: 'Vehicle Make', accessor: (row) => row.Make || 'Not Available' },
    { header: 'Vehicle Category', accessor: (row) => row.VehicleCategory || 'Not Available' },
    { header: 'Vehicle Price', accessor: (row) => row.VehiclePrice || 'Not Available' },
    { header: 'Accident Area', accessor: (row) => row.AccidentArea || 'Not Available' },
    { header: 'Fault', accessor: (row) => row.Fault || 'Not Available' },
    { header: 'Police Report Filed', accessor: (row) => row.PoliceReportFiled || 'Not Available' },
    { header: 'Witness Present', accessor: (row) => row.WitnessPresent || 'Not Available' },
    { header: 'Driver Rating', accessor: (row) => row.DriverRating || 'Not Available' },
    { header: 'Past Number of Claims', accessor: (row) => row.PastNumberOfClaims || 'Not Available' },
    { header: 'Age of Vehicle', accessor: (row) => row.AgeOfVehicle || 'Not Available' },
    { header: 'Age of Policy Holder', accessor: (row) => row.AgeOfPolicyHolder || 'Not Available' },
    { header: 'Policy Type', accessor: (row) => row.PolicyType || 'Not Available' },
    { header: 'Base Policy', accessor: (row) => row.BasePolicy || 'Not Available' },
    { header: 'Days Policy Accident', accessor: (row) => row.Days_Policy_Accident || 'Not Available' },
    { header: 'Days Policy Claim', accessor: (row) => row.Days_Policy_Claim || 'Not Available' },
    { header: 'Agent Type', accessor: (row) => row.AgentType || 'Not Available' },
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm) return dataWithIds;
    const lowerSearch = searchTerm.toLowerCase();
    return dataWithIds.filter(row =>
      // Search by Claim ID first, then all field values
      row._claimId.toLowerCase().includes(lowerSearch) ||
      detailColumns.slice(1).some(col =>
        String(col.accessor(row)).toLowerCase().includes(lowerSearch)
      )
    );
  }, [dataWithIds, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (selectedRecord) {
    return (
      <div className="bg-white min-h-screen rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedRecord(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Claim Details</h2>
              <p className="text-sm text-slate-500 font-mono">{selectedRecord._claimId}</p>
            </div>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailColumns.map((col) => (
              <div key={col.header} className={`p-4 rounded-lg border ${col.header === 'Claim ID' ? 'bg-blue-50 border-blue-200 lg:col-span-3' : 'bg-slate-50 border-slate-100'}`}>
                <span className="block text-sm font-medium text-slate-500 mb-1">{col.header}</span>
                <span className={`block font-semibold ${col.header === 'Claim ID' ? 'text-blue-700 font-mono text-lg' : 'text-slate-900'}`}>
                  {col.accessor(selectedRecord)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen rounded-xl shadow-sm border border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
            >
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              {subtitle && <p className="text-slate-600">{subtitle}</p>}
            </div>
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by Claim ID or field..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-grow overflow-auto">
        {filteredData.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No records found matching your search.
          </div>
        ) : (
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-50 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Claim ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Age</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Gender</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Vehicle Make</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Vehicle Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Accident Area</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Fault</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentData.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedRecord(row)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-blue-700">{row._claimId}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.Age || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.Sex || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.Make || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.VehicleCategory || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.AccidentArea || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{row.Fault || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-200 bg-white sticky bottom-0 flex items-center justify-between">
        <span className="text-sm text-slate-600">
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
