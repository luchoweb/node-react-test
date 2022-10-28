import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBiz } from "../../api/biz";
import useAuthCognito from "../../hooks/useAuthCognito";
import { userRoleValidation } from "../../helpers/userRoleValidation";
import Header from "./components/Header";

const DashboardPage = () => {
  const { state } = useAuthCognito();
  const isAdmin = userRoleValidation(state?.user?.info);

  const [businesses, setBusinesses] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllBiz = async () => {
      const response = await getAllBiz();
      setBusinesses(response);
    }

    if ( !businesses ) fetchAllBiz();

    return () => setIsLoading(false);
  }, [businesses]);

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="container">
          <section className="pt-4 pb-4">
            <div className="row align-items-center mb-4">
              <div className="col-6">
                <h3 className="m-0">Companies</h3>
              </div>
              <div className="col-6 text-end">
                {!isLoading && isAdmin &&
                  <Link className="btn btn-dark" to="/dashboard/biz/create">
                    Add company
                  </Link>
                }
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-dark text-white">
                  <tr>
                    <th className="p-2">NIT</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Address</th>
                    <th className="p-2">Phone</th>
                  </tr>
                </thead>

                <tbody>
                {isLoading ? (
                    <tr>
                      <td colSpan={4}>
                        Loading companies...
                      </td>
                    </tr>
                  )
                  : businesses?.length ? businesses.map(biz => (
                      <tr key={`biz-${biz.nit}`}>
                        <td>
                          {biz.nit}
                        </td>
                        <td>
                          <Link className="text-dark" to={`/dashboard/biz/${biz.id}`} title="See details">
                            {biz.name}
                          </Link>
                        </td>
                        <td>
                          {biz.address}
                        </td>
                        <td>
                          {biz.phone}
                        </td>
                      </tr>
                    )
                  )
                  :
                  <tr>
                    <td colSpan={4}>
                      No companies to show.
                    </td>
                  </tr>
                }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default DashboardPage;
