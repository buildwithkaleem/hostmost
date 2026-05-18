import {
  FaServer,
  FaGlobe,
  FaDatabase,
  FaLock,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaTrash,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { MdOutlineContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loading from "../components/Loading";

const CpanelPage = () => {

  const { user,loading } = useSelector((state) => state.user);

  const [dLoading, setDLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [file, setFile] = useState(null);

  const [site, setSite] = useState(null);

  const [copy, setCopy] = useState(false);

  const [domainData, setDomainData] = useState({
    subDomain: "",
    customDomain: "",
  });

  // =========================================
  // HANDLE DOMAIN INPUT
  // =========================================
  const handleChange = (e) => {

    setDomainData({
      ...domainData,
      [e.target.name]: e.target.value,
    });

  };

  // =========================================
  // GET USER SITE
  // =========================================
  const getSite = async () => {
    try {

      const res = await api("/site/get");

      // console.log(res.data)

      if (res) {

        setSite(res?.data);

        setDomainData({
          subDomain: res?.data?.subDomain || "",
          customDomain: res?.data?.customDomain || "",
        });

      }

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    getSite();
  }, []);

  // =========================================
  // ADD DOMAIN
  // =========================================

  const addDomain = async () => {
    try {

      setError("")
      setSuccess("")

      setDLoading(true);

      const res = await api("/site/domain-add", "POST", domainData);

      setSuccess(res?.message);

      getSite()

    } catch (error) {

      setError(error.message || " Some Thing Went Rong Add Domain ")

    } finally {

      setDLoading(false);

    }
  };

  // =========================================
  // UPDATE DOMAIN
  // =========================================
  const handleUpdateDomain = async () => {

    try {

      setDLoading(true);

      setError("");
      setSuccess("");

      const res = await api(
        "/site/domain-update",
        "POST",
        domainData
      );

      setSuccess(res?.message);

      getSite();

    } catch (error) {

      setError(
        error?.response?.data?.message ||
        error?.message
      );

    } finally {

      setDLoading(false);

    }
  };


  // =========================================
  // DELETE DOMAIN
  // =========================================
  const handleDeleteDomain = async () => {
    try {

      if (!site?._id) {
        return setError("Site ID not found");
      }

      setDLoading(true);

      setError("");
      setSuccess("");

      const res = await api(
        `/site/domain-delete/${site._id}`,
        "DELETE"
      );

      setSuccess(res?.message);

      // setDomainData({
      //   subDomain: "",
      //   customDomain: "",
      // });

      getSite();

    } catch (error) {

      console.log(error);

      setError(
        error?.message || "Something went wrong"
      );

    } finally {

      setDLoading(false);

    }
  };

  // =========================================
  // UPLOAD SOURCE
  // =========================================
  const handleUploadSource = async () => {

    if (!file) {
      return setError("Please select ZIP file");
    }

    try {

      setUploading(true);

      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("source", file);

      console.log(formData)

      const res = await api(
        "/site/source-add",
        "POST",
        formData
      );

      console.log(res)

      setSuccess(res?.message);

      setFile(null);

      getSite();

    } catch (error) {
      console.log(error)
      setError(
        error?.response?.data?.message ||
        error?.message
      );

    } finally {

      setUploading(false);

    }
  };

  // =========================================
  // DELETE SOURCE
  // =========================================
  const handleDeleteSource = async () => {

    try {

      setDLoading(true);

      setError("");
      setSuccess("");

      const res = await api(
        `/site/source-delete/${site?._id}`,
        "DELETE"
      );

      setSuccess(res?.message);

      getSite();

    } catch (error) {

      setError(
        error?.response?.data?.message ||
        error?.message
      );

    } finally {

      setDLoading(false);

    }
  };

  if (loading) return <Loading />;

  if (!user || user?.status === "pending") {
    return <Navigate to="/" replace />;
  }

  return (
    <>    
     

      <section className="min-h-screen bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm font-medium">

                  <FaServer />

                  Hosting Dashboard

                </div>

                <h1 className="text-4xl md:text-5xl font-bold mt-5">
                  Welcome to cPanel
                </h1>

                <p className="text-indigo-100 mt-4 max-w-2xl leading-relaxed">
                  Manage domains, source files, SSL security,
                  hosting deployment and more.
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 min-w-[280px]">

                <p className="text-sm text-indigo-100">
                  Hosting Status
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <div className="h-4 w-4 rounded-full bg-green-400 animate-pulse"></div>

                  <h3 className="text-2xl font-bold capitalize">
                    Active
                  </h3>

                </div>

                <p className="text-sm text-indigo-100 mt-5">
                  Created
                </p>

                <h4 className="font-semibold mt-1">
                  {site?.createdAt
                    ? new Date(site.createdAt).toDateString()
                    : "Add Your Site"}
                </h4>

              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">

              {/* DOMAIN CARD */}
              <div className="bg-white rounded-3xl p-8 border shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      Domain Management
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Manage your hosting domains.
                    </p>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                    <FaGlobe />
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                  {/* SUBDOMAIN */}
                  <div>

                    <label className="text-sm font-medium text-gray-700">
                      Sub Domain
                    </label>

                    <input
                      type="text"
                      name="subDomain"
                      value={domainData?.subDomain}
                      readOnly={site?.subDomain}
                      onChange={handleChange}
                      placeholder="myproject.hosting.com"
                      className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                  </div>


                  {/* CUSTOM DOMAIN */}
                  <div>

                    <label className="text-sm font-medium text-gray-700">
                      Custom Domain
                    </label>

                    <input
                      type="text"
                      name="customDomain"
                      value={domainData?.customDomain}
                      readOnly={site?.customDomain}
                      onChange={handleChange}
                      placeholder="www.example.com"
                      className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                  </div>

                </div>

                {/* DNS & SERVER INFO */}
                {site?.serverIp && <div className="bg-white rounded-3xl p-8 border shadow-sm mt-8">

                  <div className="flex items-center justify-between">

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        DNS Configuration
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Connect your custom domain with A Record
                      </p>
                    </div>

                    <div className="h-14 w-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl">
                      <FaGlobe />
                    </div>

                  </div>

                  {/* SERVER IP */}
                  <div>
                    <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white">

                      <p className="text-sm text-indigo-100">
                        Your Server IP Address
                      </p>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-3">

                        <h3 className="text-3xl font-bold break-all">
                          {site?.serverIp || "192.168.10.25"}
                        </h3>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              site?.serverIp || "192.168.10.25"
                            );
                            setCopy(true)
                          }}
                          className="px-5 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:opacity-90 transition cursor-pointer"
                        >
                          {copy ? "✅ Copy" : <MdOutlineContentCopy size={20} />}
                        </button>

                      </div>

                    </div>

                    {/* A RECORD GUIDE */}
                    <div className="mt-8 border rounded-3xl p-6 bg-gray-50">

                      <h3 className="text-xl font-bold text-gray-900">
                        How To Add A Record
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Follow these steps inside your domain provider panel.
                      </p>

                      <div className="mt-6 space-y-5">

                        {/* STEP 1 */}
                        <div className="flex gap-4">

                          <div className="min-w-[45px] h-[45px] rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                            1
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900">
                              Open DNS Management
                            </h4>

                            <p className="text-gray-500 mt-1">
                              Login to your domain provider and open DNS settings.
                            </p>
                          </div>

                        </div>

                        {/* STEP 2 */}
                        <div className="flex gap-4">

                          <div className="min-w-[45px] h-[45px] rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                            2
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900">
                              Create New A Record
                            </h4>

                            <p className="text-gray-500 mt-1">
                              Add a new DNS record with these values.
                            </p>
                          </div>

                        </div>

                        {/* DNS TABLE */}
                        <div className="overflow-x-auto">

                          <table className="w-full mt-4 border rounded-2xl overflow-hidden">

                            <thead className="bg-indigo-600 text-white">

                              <tr>
                                <th className="text-left px-5 py-4">
                                  Type
                                </th>

                                <th className="text-left px-5 py-4">
                                  Host
                                </th>

                                <th className="text-left px-5 py-4">
                                  Value
                                </th>

                                <th className="text-left px-5 py-4">
                                  TTL
                                </th>
                              </tr>

                            </thead>

                            <tbody className="bg-white">

                              <tr className="border-t">

                                <td className="px-5 py-4 font-semibold">
                                  A
                                </td>

                                <td className="px-5 py-4">
                                  @
                                </td>

                                <td className="px-5 py-4 break-all text-indigo-600 font-bold">
                                  {site?.serverIp || "192.168.10.25"}
                                </td>

                                <td className="px-5 py-4">
                                  Auto
                                </td>

                              </tr>

                            </tbody>

                          </table>

                        </div>

                        {/* STEP 3 */}
                        <div className="flex gap-4 pt-3">

                          <div className="min-w-[45px] h-[45px] rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                            ✓
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900">
                              Wait For DNS Propagation
                            </h4>

                            <p className="text-gray-500 mt-1">
                              DNS updates may take 5 minutes to 24 hours worldwide.
                            </p>
                          </div>

                        </div>

                      </div>

                    </div>
                  </div>

                </div>}

                <div className="flex flex-wrap gap-4 mt-8">

                  {!site?.subDomain && !site?.customDomain ? <button
                    onClick={site?.createdAt ? handleUpdateDomain : addDomain}
                    disabled={dLoading}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
                  >

                    {dLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaSave />
                    )}

                    Save Domain

                  </button> :

                    <button
                      onClick={handleDeleteDomain}
                      disabled={dLoading}
                      className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
                    >

                      <FaTrash />

                      Delete Domain

                    </button>
                  }

                </div>

              </div>


              {/* ALERTS */}
              {error && (
                <div className="mt-6 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-600">
                  ❌ {error}
                </div>
              )}

              {success && (
                <div className="mt-6 p-4 rounded-2xl border border-green-200 bg-green-50 text-green-600">
                  ✅ {success}
                </div>
              )}

              {/* SOURCE */}
              <div className={`${!site && "opacity-50 pointer-events-none"} bg-white rounded-3xl p-8 border shadow-sm`}>

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      Website Source
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Upload your ZIP source code.
                    </p>

                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
                    <FaCloudUploadAlt />
                  </div>

                </div>

                {/* UPLOAD */}
                <div className={`  ${site?.source ? "opacity-50 pointer-events-none" : ""} mt-8 border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center`}>

                  <div className="flex justify-center">

                    <div className="h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl">
                      <FaCloudUploadAlt />
                    </div>

                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-5">
                    Upload ZIP Project
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Only .zip source files supported
                  </p>

                  <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mt-6 block w-full border border-gray-300 rounded-xl p-3"
                  />

                  <button
                    onClick={handleUploadSource}
                    disabled={uploading}
                    className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
                  >

                    {uploading ? "Uploading..." : "Upload Source"}

                  </button>

                </div>

                {/* FILE */}
                {site?.source && (
                  <div className="mt-8 border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-green-50 border-green-200">

                    <div className="flex items-center gap-4">

                      <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                        <FaCheckCircle />
                      </div>

                      <div>

                        <p className="text-sm text-gray-500">
                          Uploaded Source
                        </p>

                        <h3 className="font-bold text-gray-900">
                          project.zip
                        </h3>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <a
                        href={site?.sitePublicLink}
                        target="_blank"
                        rel="noreferrer"
                        className={` ${!site?.sitePublicLink && "opacity-50 pointer-events-none"} px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:opacity-90 transition cursor-pointer flex items-center gap-2`}
                      >

                        <FaExternalLinkAlt />

                        View

                      </a>

                      <button
                        onClick={handleDeleteSource}
                        className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm hover:opacity-90 transition cursor-pointer flex items-center gap-2"
                      >

                        <FaTrash />

                        Delete

                      </button>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              {/* DATABASE */}
              <div className="bg-white rounded-3xl p-8 border shadow-sm">

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                    <FaDatabase />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Database
                    </h2>

                    <p className="text-sm text-gray-500">
                      SQL and NoSql Database Active
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Database Name
                    </span>

                    <span className="font-semibold text-gray-900">
                      hostmost_db
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Status
                    </span>

                    {site?.createdAt && <span className="text-green-600 font-semibold">
                      Connected
                    </span>}

                  </div>

                </div>

              </div>

              {/* SSL */}
              <div className="bg-white rounded-3xl p-8 border shadow-sm">

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                    <FaLock />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      SSL Security
                    </h2>

                    <p className="text-sm text-gray-500">
                      Website secured with SSL
                    </p>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-5">

                  <div className="flex items-center gap-3">

                    <div className="h-4 w-4 rounded-full bg-green-500"></div>

                    <p className="font-semibold text-green-700">
                      SSL Certificate Active
                    </p>

                  </div>

                </div>

              </div>

              {/* QUICK ACTION */}
              <div className="bg-gradient-to-br opacity-50 pointer-events-none from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">

                <h2 className="text-2xl font-bold">
                  Quick Actions
                </h2>

                <div className="space-y-4 mt-6">

                  <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer">
                    Open File Manager
                  </button>

                  <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer">
                    Manage Domains
                  </button>

                  <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer">
                    Restart Hosting
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>

  );
};

export default CpanelPage;