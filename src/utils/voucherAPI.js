import { configAPI } from "./configAPI";

export const apiUsers = {
  login: async (username, password) => {
    try {
      const response = await configAPI.post(
        "/v01/monitoring-voucher/api/login",
        {
          identifier: username,
          password: password,
          rememberMe: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  logout: async () => {
    try {
      const response = await configAPI.get(
        "/v01/monitoring-voucher/api/logout"
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  },
  detailUsers: async () => {
    try {
      const response = await configAPI.get(
        "/v01/monitoring-voucher/api/getuserbyId"
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  verifyToken: async () => {
    try {
      const response = await configAPI.get(
        `/v01/monitoring-voucher/api/protected`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export const voucher = {
  inquiry: async (page, limit, search, from, to) => {
    try {
      const response = await configAPI.get(
        "/v01/monitoring-voucher/api/vouchers/inquiry",
        {
          params: {
            page,
            limit,
            search,
            from,
            to,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  usage: async (page, limit, search, from, to) => {
    try {
      const response = await configAPI.get(
        "/v01/monitoring-voucher/api/vouchers/usage",
        {
          params: {
            page,
            limit,
            search,
            from,
            to,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  redemption: async (page, limit, search, from, to) => {
    try {
      const response = await configAPI.get(
        "/v01/monitoring-voucher/api/vouchers/redemption",
        {
          params: {
            page,
            limit,
            search,
            from,
            to,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const Parking = {
  inquiry: async (page, limit, search, from, to) => {
    try {
      const response = await configAPI.get(
        "/v01/transaction-parking/api/transactions/getInquiry",
        {
          params: {
            page,
            limit,
            search,
            from,
            to,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  payment: async (page, limit, search, from, to) => {
    try {
      const response = await configAPI.get(
        "/v01/transaction-parking/api/transactions/paymentConfirmation",
        {
          params: {
            page,
            limit,
            search,
            from,
            to,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const summaryData = {
  summary: async (startDate = "", endDate = "") => {
    try {
      const response = await configAPI.get("/v01/summary/api/getSummary", {
        params: {
          startDate,
          endDate,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
