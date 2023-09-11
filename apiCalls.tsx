import { getUserFromLocalStorage } from "./utils/auth";
import axios from "axios";
import { User } from "./utils/auth";
import Cookies from "js-cookie";

const BACKEND_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";


const portfolioLink = `${BACKEND_URL}/portfolios`;
const userLink = `${BACKEND_URL}/users`;
const clientLink = `${BACKEND_URL}/clients`;
const portClientLink = `${BACKEND_URL}/portfolio-clients`;
const projectLink = `${BACKEND_URL}/projects`;
const PortfolioProjectClientLink = `${BACKEND_URL}/portfolio_client_project`;
const stakeholderLink = `${BACKEND_URL}/stakeholders`;
const contributionLink = `${BACKEND_URL}/contributions`;
const contributionToolLink = `${BACKEND_URL}/contributionstool`;
const dltport = `${BACKEND_URL}/portfolios/${portfolioLink}`;

const outcomeLink = `${BACKEND_URL}/outcomes`;
const toolLink = `${BACKEND_URL}/tools`;
// Tokens and config for authorisation
// make into function so updated value get called for each api call

const token = () => {
  return Cookies.get("token");
};
const cookieToken = token();

const headersList = {
  Accept: "*/*",
};

const config = () => {
  const user = getUserFromLocalStorage();
  const token = user?.token;
  const userId = user?.id;

  if (!token || !userId) {
    console.error("User not authenticated.");
    // Handle the case when the user is not authenticated or redirect to the sign-in page
    return;
  }
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token || cookieToken}`,
  };
  return {
    headers: headersList,
  };
};
const addNewClient = async (clientDetails: any) => {
  try {
    const user = getUserFromLocalStorage();
    const token = user?.token;
    const headersList = {
      Accept: "*/*",

      Authorization: `Bearer ${token}`,
    };
    const url = `${BACKEND_URL}/clients`;
    const response = await axios.post(url, clientDetails, {
      headers: headersList,
    });

    return { result: "success", message: "Successfully Created user" };
  } catch (error) {
    console.log(error);
    return { result: "error", message: error };
  }
};
const signIn = async (data: { email: string; password: string }) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/auth/login`, {
      email: data.email,
      password: data.password,
    });
    return res;
  } catch (error) {
    return error;
  }
};

const getUser = async (token: string | string[]) => {
  try {
    const headersWithToken = {
      ...headersList,
      Authorization: `Bearer ${token}`,
    };
    const url = `${BACKEND_URL}/getuser`;
    const response = await axios.get(url, {
      headers: headersWithToken,
    });
    const data = response.data;

    const userData = {
      id: data.user.id,
      name: data.user.first_name + " " + data.user.last_name,
      email: data.user.email,
      linked_in: data.user.linked_in,
      token: token,
      education: data.education,
    };
    return userData;

    // Redirect to the dashboard after successful registration
  } catch (error) {
    console.error(error);
  }
};

const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/auth/register`,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};

const handleProjectCreation = async (data: any, user: { token: any }) => {
  try {
    const url = `${BACKEND_URL}/projects`;
    const headersList = {
      Accept: "*/*",

      Authorization: `Bearer ${user?.token}`,
    };
    const response = await axios.post(url, data, { headers: headersList });
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

const handleSignUpWithGoogle = async () => {
  try {
    const url = `${BACKEND_URL}/auth/google/redirect`;

    const response = await axios.get(url, config());
    const { data } = response;
    window.location.href = data; // Redirect to the response URL
  } catch (error) {
    console.error("Error occurred while fetching response URL:", error);
  }
};

const getPortfolioByID = async (portfolioID: string) => {
  try {
    const result = await axios.get(`${portfolioLink}/${portfolioID}`, config());

    return result;
  } catch (error) {
    return error;
  }
};
const getStakeholders = async () => {
  try {
    const result = await axios.get(`${stakeholderLink}`, config());
    return result;
  } catch (error) {
    return error;
  }
};
const getContributions = async () => {
  try {
    const result = await axios.get(`${contributionLink}`, config());
    return result;
  } catch (error) {
    return error;
  }
};

const getContributionsBYPID = async (id:string) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/contributions/projectID/${id}`, config());
    return result;
  } catch (error) {
    return error;
  }
};
const getTools = async () => {
  try {
    const result = await axios.get(`${toolLink}`, config());
    return result;
  } catch (error) {
    return error;
  }
};
const getToolByID = async (id: string) => {
  try {
    const result = await axios.get(`${toolLink}/${id}`, config());
    return result;
  } catch (error) {
    return error;
  }
};
const getUserByID = async (userID: string) => {
  try {
    const result = await axios.get(`${userLink}/${userID}`, config());

    return result;
  } catch (error) {
    return error;
  }
};
const delPortfolioClientProjectByID = async (ID: string) => {
  try {
    const result = await axios.delete(
      `${PortfolioProjectClientLink}/${ID}`,
      config()
    );

    return result;
  } catch (error) {
    return error;
  }
};
const delProjectByID = async (ID: string) => {
  try {
    const result = await axios.delete(`${projectLink}/${ID}`, config());

    return result;
  } catch (error) {
    return error;
  }
};
const delOutcomeByID = async (ID: string) => {
  try {
    const result = await axios.delete(`${outcomeLink}/${ID}`, config());

    return result;
  } catch (error) {
    return error;
  }
};

const delContribution = async (id: string) => {
  try {
    const result = await axios.delete(`${contributionLink}/${id}`, config());

    return result;
  } catch (error) {
    return error;
  }
};
const delContributionByCID = async (id: string) => {
  try {
    const result = await axios.delete(`${BACKEND_URL}/tools/delByCID/${id}`, config());

    return result;
  } catch (error) {
    return error;
  }
};

const getClientNames = async () => {
  try {
    const result = await axios.get(`${BACKEND_URL}/getClientNames`, config());
    return result;
  } catch (error) {
    return error;
  }
};

const getClientByName = async (client_name: string) => {
  try {
    const result = await axios.get(
      `${clientLink}/name/${encodeURIComponent(client_name)}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getClientByID = async (client_id: number) => {
  try {
    const result = await axios.get(`${clientLink}/${client_id}`, config());
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getExps = async () => {
  try {
    const result = await axios.get(`${portClientLink}`, config());
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getExpsByPortID = async (portfolio_id: string) => {
  try {
    const result = await axios.get(
      `${portClientLink}/portfolio/${portfolio_id}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getProjects = async () => {
  try {
    const result = await axios.get(`${projectLink}`, config());
    return result;
  } catch (error) {
    console.log(error);
  }
};

const storeExperienceProjectClient = async (data: {
  portfolio_id: number;
  client_id: number;
  client_name: number;
  company_status: string;
  client_description: string;
  currently_working: boolean;
  start_date: Date;
  end_date: Date;
}) => {
  try {
    console.log(data);
    const res = await axios.post(
      `${portClientLink}`,
      {
        portfolioID: data.portfolio_id,
        clientID: data.client_id,
        clientName: data.client_name,
        clientStatus: data.company_status,
        clientDescription: data.client_description,
        currently_working: data.currently_working,
        start_date: data.start_date,
        end_date: data.end_date,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};

const fetchOutcomes = async () => {
  try {
    // Make an API call to fetch the outcomes data from the backend
    const response = await axios.get(`${BACKEND_URL}/outcomes`, config());
    const fetchedOutcomes = response.data;
    return fetchedOutcomes;
  } catch (error) {
    console.error("Error fetching outcomes:", error);
  }
};

const getOutcomeByProjectID = async (project_id: string) => {
  try {
    // Make an API call to fetch the outcomes data from the backend
    const response = await axios.get(
      `${BACKEND_URL}/outcomes/project/${project_id}`,
      config()
    );
    const fetchedOutcomes = response.data;
    return fetchedOutcomes;
  } catch (error) {
    console.error("Error fetching outcomes:", error);
  }
};
const storeProjectPortfolioClient = async (data: {
  portfolio_client_id: string;
  project_id: string;
  project_title: string;
  project_role: string;
  project_type: string;
  project_desc: string;
  project_stage: string;
}) => {
  try {
    const res = await axios.post(
      `${PortfolioProjectClientLink}`,
      {
        portfolio_client_id: data.portfolio_client_id,
        project_id: data.project_id,
        project_title: data.project_title,
        project_type: data.project_type,
        project_role: data.project_role,
        project_desc: data.project_desc,
        project_stage: data.project_stage,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};
const storeProject = async (data: {
  project_title: string;
  project_role: string;
  project_type: string;
  project_desc: string;
  project_stage: string;
}) => {
  try {
    const res = await axios.post(
      `${projectLink}`,
      {
        projectTitle: data.project_title,
        projectType: data.project_type,
        projectRole: data.project_role,
        projectDesc: data.project_desc,
        projectStage: data.project_stage,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};
const getProjectByClientPortfolio = async (portfolio_client_id: string) => {
  try {
    const result = await axios.get(
      `${PortfolioProjectClientLink}/getProj/${portfolio_client_id}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch user clients
const fetchUserClients = async (portfolioId: any, user: { token: any }) => {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${user?.token}`,
  };
  try {
    // Make the request using axios
    const url = `${BACKEND_URL}/user-clients/${portfolioId}`;
    const response = await axios.get(url, {
      headers: headersList,
    });

    // Return the response data
    return response;
  } catch (error) {
    // Handle errors here, e.g., show an error message or log the error
    console.error("Error fetching user clients:", error);
    throw error;
  }
};

const fetchPortfolios = async () => {
  try {
    const user = getUserFromLocalStorage();
    const token = user?.token;
    const userId = user?.id;

    if (!token || !userId) {
      console.error("User not authenticated.");
      // Handle the case when the user is not authenticated or redirect to the sign-in page
      return;
    }

    const headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    };
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendURL}/portfolios`;
    const response = await axios.get(url, {
      headers: headersList,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getPortfolioByUserID = async () => {
  try {
    const user = getUserFromLocalStorage();
    const token = user?.token;
    const userId = user?.id;

    if (!token || !userId) {
      console.error("User not authenticated.");
      // Handle the case when the user is not authenticated or redirect to the sign-in page
      return;
    }

    const headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    };
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendURL}/portfolios/byUser/${userId}`;
    const response = await axios.get(url, {
      headers: headersList,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getActions = async (role: string) => {
  try {
    console.log(role);

    const result = await axios.get(
      `${BACKEND_URL}/actionsfilter/${encodeURI(role)}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getActionByID = async (id: string) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/actions/${id}`, config());
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getContributionToolByContribution = async (id: string) => {
  try {
    const result = await axios.get(
      `${BACKEND_URL}/contributionstool/cid/${id}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getStakeholderBYID = async (id: string) => {
  try {
    const result = await axios.get(
      `${BACKEND_URL}/stakeholders/${id}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getItemByID = async (id: string) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/items/${id}`, config());
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createPortfolioClient = async (formData: any, user: { token: any }) => {
  try {
    const headersList = {
      Accept: "*/*",

      Authorization: `Bearer ${user?.token}`,
    };
    const url = `${BACKEND_URL}/user-clients`;
    const response = await axios.post(url, formData, { headers: headersList });
    return response;
  } catch (error) {
    // Handle errors here
    throw error;
  }
};
async function fetchProjects(portfolioId: any, user: { token: any }) {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND_URL}/portfolio/projects?portfolioid=${portfolioId}`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.request(config);
    console.log("Response projects ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
async function fetchClients(user: { token: any }) {
  try {
    const url = `${BACKEND_URL}/clients`;
    const headersList = {
      Accept: "*/*",

      Authorization: `Bearer ${user?.token}`,
    };
    const response = await axios.get(url, {
      headers: headersList,
    });

    return response.data;
  } catch (error) {
    // Handle any network or API-related errors
    console.error("Error fetching clients:", error);
    throw error;
  }
}

const storeOutcome = async (data: {
  projectId: string;
  actions: string;
  itemsAffected: string;
  byFromOver: string;
  achievement: string;
}) => {
  try {
    const res = await axios.post(
      `${outcomeLink}`,
      {
        projectId: data.projectId,
        actions: data.actions,
        itemsAffected: data.itemsAffected,
        byFromOver: data.byFromOver,
        achievement: data.achievement,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};
const addAddress = async (addressData: any, token: any) => {
  const url = `${BACKEND_URL}/addresses`;

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: addressData,
  };

  try {
    const response = await axios.request(config);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error to be handled by the caller
  }
};

export default addAddress;

const updateOutcome = async (data: {
  outcome_id: string;
  actions: string;
  itemsAffected: string;
  byFromOver: string;

  achievement: string;
}) => {
  try {
    const res = await axios.put(
      `${outcomeLink}/${data.outcome_id}`,
      {
        actions: data.actions,
        itemsAffected: data.itemsAffected,
        byFromOver: data.byFromOver,
        achievement: data.achievement,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};

const updateContribution = async (form:FormData, id:string) => {
  try {
    const res = await axios.put(
      `${contributionLink}/${id}`,
      form,
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};

const updateStatusPortfolio = async (data: {
  status: string;
  portfolio_id: string;
}) => {
  try {
    const res = await axios.put(
      `${portfolioLink}/update-status/${data.portfolio_id}`,
      {
        status: data.status,
      },
      config()
    );
    return res;
  } catch (error) {
    return error;
  }
};

// apiCalls.js

// ... (your existing imports and constants)

const clonePortfolio = async (portfolioId: any, user: { token: any }) => {
  try {
    const user = getUserFromLocalStorage();
    const token = user?.token;

    if (!token) {
      console.error("User not authenticated.");
      // Handle the case when the user is not authenticated or redirect to the sign-in page
      return;
    }

    const headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    const url = `${BACKEND_URL}/portfolios/clone/${portfolioId}`;
    const response = await axios.get(url, { headers: headersList });

    return response;
  } catch (error) {
    console.error("Error cloning portfolio:", error);
    throw error;
  }
};

const deletePortfolioById = async (portfolioId: any, user: { token: any }) => {
  try {
    const user = getUserFromLocalStorage();
    const token = user?.token;

    if (!token) {
      console.error("User not authenticated.");
      // Handle the case when the user is not authenticated or redirect to the sign-in page
      return;
    }

    const headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(dltport, { headers: headersList });

    return response;
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw error;
  }
};

const postDocument = async (form: FormData) => {
  // Make a POST request to the backend with the FormData object
  try {
    const response = await axios.post(
      `${BACKEND_URL}/documents`,
      form,
      config()
    );
    console.log("File upload successful", response.data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createSelectionCriteria = async (form: FormData) => {
  try {
    const job_application_id = form.get("job_application_id");
    // Make a POST request to the backend with the FormData object
    //this is still wrong because no job application is being sent
    const response = await axios.post(
      `${BACKEND_URL}/job-applications/${job_application_id}/selectionCriteria`,
      form,
      config()
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchSelectionCriteria = async (job_application_id: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/job-applications/${job_application_id}/selectionCriteria`,
      config()
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getResumeData = async (portfolioId: any, user: { token: any }) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND_URL}/fetchresumeData`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        id: portfolioId,
      },
    };

    const response = await axios.request(config);
    return { result: "success", message: response.data.message };
  } catch (error) {
    console.error(error);
    return { result: "error", message: "error check console" };
  }
};

const inviteReviewer = (data: { portfolioId: number; email: String }) => {
  // Make a POST request to the backend with the FormData object
  try {
    const response = axios.post(
      `${BACKEND_URL}/invitereviewer`,
      data,
      config()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const createContribution = async (form: FormData) => {
  try {
    const response = await axios.post(`${contributionLink}`, form, config());
    console.log("Contribution created", response.data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const createContributionTool = async (form: FormData) => {
  try {
    const response = await axios.post(
      `${contributionToolLink}`,
      form,
      config()
    );
    console.log("Contribution Tool created", response.data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createJobApplication = async (
  form: FormData
  //   {
  //   portfolioID: string;
  //   clientID: string;
  //   roleName: string;
  //   jobDescription: string;
  //   status: string;
  // }
) => {
  try {
    const portfolio_id = form.get("portfolioID");
    // const portfolio_id = form.portfolioID;
    const response = await axios.post(
      `${BACKEND_URL}/portfolios/${portfolio_id}/job-applications`,
      form,
      config()
    );
    console.log("File upload successful", response.data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getJobApplicationByPortID = async (portfolio_id: string) => {
  try {
    const result = await axios.get(
      `${BACKEND_URL}/portfolios/${portfolio_id}/job-applications`,
      config()
    );
    return result;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
const getItems = async (role: string) => {
  try {
    const result = await axios.get(
      `${BACKEND_URL}/itemsfilter/${encodeURI(role)}`,
      config()
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signIn,
  register,
  getUser,
  handleSignUpWithGoogle,
  getPortfolioByID,
  getUserByID,
  getClientNames,
  getClientByName,
  getClientByID,
  storeExperienceProjectClient,
  getExps,
  getProjects,
  getProjectByClientPortfolio,
  storeProject,
  storeProjectPortfolioClient,
  delPortfolioClientProjectByID,
  delProjectByID,

  fetchPortfolios,
  fetchUserClients,
  fetchClients,
  createPortfolioClient,
  handleProjectCreation,
  fetchProjects,
  addNewClient,
  getExpsByPortID,
  getPortfolioByUserID,
  fetchOutcomes,
  storeOutcome,
  getOutcomeByProjectID,
  delOutcomeByID,
  updateOutcome,
  addAddress,
  clonePortfolio,
  deletePortfolioById,
  postDocument,
  updateStatusPortfolio,
  createSelectionCriteria,
  getResumeData,
  createJobApplication,
  getJobApplicationByPortID,
  fetchSelectionCriteria,
  inviteReviewer,
  getActions,
  getItems,
  getStakeholders,
  getTools,
  createContribution,
  createContributionTool,
  getContributions,
  getItemByID,
  getActionByID,
  getStakeholderBYID,
  getContributionToolByContribution,
  getToolByID,
  delContributionByCID,
  updateContribution,
  getContributionsBYPID,
  delContribution
};
