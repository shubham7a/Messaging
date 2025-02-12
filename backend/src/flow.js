// const SCREEN_RESPONSES = {
//     APPOINTMENT: {
//       screen: "APPOINTMENT",
//       data: {
//         department: [
//           {
//             id: "shopping",
//             title: "Shopping & Groceries",
//           },
//           {
//             id: "clothing",
//             title: "Clothing & Apparel",
//           },
//           {
//             id: "home",
//             title: "Home Goods & Decor",
//           },
//           {
//             id: "electronics",
//             title: "Electronics & Appliances",
//           },
//           {
//             id: "beauty",
//             title: "Beauty & Personal Care",
//           },
//         ],
//         location: [
//           {
//             id: "1",
//             title: "King\u2019s Cross, London",
//           },
//           {
//             id: "2",
//             title: "Oxford Street, London",
//           },
//           {
//             id: "3",
//             title: "Covent Garden, London",
//           },
//           {
//             id: "4",
//             title: "Piccadilly Circus, London",
//           },
//         ],
//         is_location_enabled: true,
//         date: [
//           {
//             id: "2024-01-01",
//             title: "Mon Jan 01 2024",
//           },
//           {
//             id: "2024-01-02",
//             title: "Tue Jan 02 2024",
//           },
//           {
//             id: "2024-01-03",
//             title: "Wed Jan 03 2024",
//           },
//         ],
//         is_date_enabled: true,
//         time: [
//           {
//             id: "10:30",
//             title: "10:30",
//           },
//           {
//             id: "11:00",
//             title: "11:00",
//             enabled: false,
//           },
//           {
//             id: "11:30",
//             title: "11:30",
//           },
//           {
//             id: "12:00",
//             title: "12:00",
//             enabled: false,
//           },
//           {
//             id: "12:30",
//             title: "12:30",
//           },
//         ],
//         is_time_enabled: true,
//       },
//     },
//     DETAILS: {
//       screen: "DETAILS",
//       data: {
//         department: "beauty",
//         location: "1",
//         date: "2024-01-01",
//         time: "11:30",
//       },
//     },
//     SUMMARY: {
//       screen: "SUMMARY",
//       data: {
//         appointment:
//           "Beauty & Personal Care Department at Kings Cross, London\nMon Jan 01 2024 at 11:30.",
//         details:
//           "Name: John Doe\nEmail: john@example.com\nPhone: 123456789\n\nA free skin care consultation, please",
//         department: "beauty",
//         location: "1",
//         date: "2024-01-01",
//         time: "11:30",
//         name: "John Doe",
//         email: "john@example.com",
//         phone: "123456789",
//         more_details: "A free skin care consultation, please",
//       },
//     },
//     TERMS: {
//       screen: "TERMS",
//       data: {},
//     },
//     SUCCESS: {
//       screen: "SUCCESS",
//       data: {
//         extension_message_response: {
//           params: {
//             flow_token: "Trai",
//             some_param_name: "12345",
//           },
//         },
//       },
//     },
//   };
//      const getNextScreen = async (decryptedBody) => {
//       const { screen, data, version, action, flow_token } = decryptedBody;
//       // console.log("screen",screen);
//       // console.log("data",data);
//       // console.log("version",version);
//       // console.log("action",action);
//       // console.log("flow_token",flow_token);
//       // handle health check request
//       if (action === "ping") {
//         return {
//           data: {
//             status: "active",
//           },
//         };
//       }

//       // handle error notification
//       if (data?.error) {
//         console.warn("Received client error:", data);
//         return {
//           data: {
//             acknowledged: true,
//           },
//         };
//       }

//       // handle initial request when opening the flow and display APPOINTMENT screen

//       if (action === "INIT") {
//         return {
//           ...SCREEN_RESPONSES.APPOINTMENT,
//           data: {
//             ...SCREEN_RESPONSES.APPOINTMENT.data,
//             // these fields are disabled initially. Each field is enabled when previous fields are selected
//             is_location_enabled: false,
//             is_date_enabled: false,
//             is_time_enabled: false,
//           },
//         };
//       }

//       if (action === "data_exchange") {
//         // handle the request based on the current screen
//         switch (screen) {
//           // handles when user interacts with APPOINTMENT screen
//           case "APPOINTMENT":
//             // update the appointment fields based on current user selection
//             return {
//               ...SCREEN_RESPONSES.APPOINTMENT,
//               data: {
//                 // copy initial screen data then override specific fields
//                 ...SCREEN_RESPONSES.APPOINTMENT.data,
//                 // each field is enabled only when previous fields are selected
//                 is_location_enabled: Boolean(data.department),
//                 is_date_enabled: Boolean(data.department) && Boolean(data.location),
//                 is_time_enabled:
//                   Boolean(data.department) &&
//                   Boolean(data.location) &&
//                   Boolean(data.date),

//                 //TODO: filter each field options based on current selection, here we filter randomly instead
//                 location: SCREEN_RESPONSES.APPOINTMENT.data.location.slice(0, 3),
//                 date: SCREEN_RESPONSES.APPOINTMENT.data.date.slice(0, 3),
//                 time: SCREEN_RESPONSES.APPOINTMENT.data.time.slice(0, 3),
//               },
//             };

//           // handles when user completes DETAILS screen
//           case "DETAILS":
//             // the client payload contains selected ids from dropdown lists, we need to map them to names to display to user
//             const departmentName =
//               SCREEN_RESPONSES.APPOINTMENT.data.department.find(
//                 (dept) => dept.id === data.department
//               ).title;
//             const locationName = SCREEN_RESPONSES.APPOINTMENT.data.location.find(
//               (loc) => loc.id === data.location
//             ).title;
//             const dateName = SCREEN_RESPONSES.APPOINTMENT.data.date.find(
//               (date) => date.id === data.date
//             ).title;

//             const appointment = `${departmentName} at ${locationName}
//     ${dateName} at ${data.time}`;

//             const details = `Name: ${data.name}
//     Email: ${data.email}
//     Phone: ${data.phone}
//     "${data.more_details}"`;

//             return {
//               ...SCREEN_RESPONSES.SUMMARY,
//               data: {
//                 appointment,
//                 details,
//                 // return the same fields sent from client back to submit in the next step
//                 ...data,
//               },
//             };

//           // handles when user completes SUMMARY screen
//           case "SUMMARY":
//             // TODO: save appointment to your database
//             // send success response to complete and close the flow
//             return {
//               ...SCREEN_RESPONSES.SUCCESS,
//               data: {
//                 extension_message_response: {
//                   params: {
//                     flow_token,
//                   },
//                 },
//                 ...data,
//               },
//             };

//           default:
//             break;
//         }
//       }

//       console.error("Unhandled request body:", decryptedBody);
//       throw new Error(
//         "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
//       );
//     };

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// this object is generated from Flow Builder under "..." > Endpoint > Snippets > Responses
// To navigate to a screen, return the corresponding response from the endpoint. Make sure the response is encrypted.
const SCREEN_RESPONSES = {
  APPLICANTS: {
    screen: "APPLICANTS",
    data: {
      cover: [
        {
          id: "myself",
          title: "Just myself",
        },
        {
          id: "myself_and_another",
          title: "Myself & another person",
        },
        {
          id: "my_family",
          title: "My family",
        },
        {
          id: "my_children",
          title: "Just my children (under 18)",
        },
      ],
      add_additional: false,
      additional_applicants_count: [
        {
          id: "1",
          title: "1",
        },
        {
          id: "2",
          title: "2",
        },
        {
          id: "3",
          title: "3",
        },
        {
          id: "4",
          title: "4",
        },
        {
          id: "5",
          title: "5",
        },
        {
          id: "6",
          title: "6",
        },
      ],
    },
  },
  COVER_LEVEL: {
    screen: "COVER_LEVEL",
    data: {},
  },
  EXCESS: {
    screen: "EXCESS",
    data: {
      excess: [
        {
          id: "5000.00",
          title: "\u20b9 5000.00",
        },
        {
          id: "10000.00",
          title: "\u20b9 10000.00",
        },
        {
          id: "15000.00",
          title: "\u20b9 15000.00",
        },
        {
          id: "20000.00",
          title: "\u20b9 20000.00",
        },
        {
          id: "25000.00",
          title: "\u20b9 25000.00",
        },
      ],
    },
  },
  DETAILS: {
    screen: "DETAILS",
    data: {},
  },
  YOUR_HEALTH: {
    screen: "YOUR_HEALTH",
    data: {},
  },
  ADDITIONAL_APPLICANT: {
    screen: "ADDITIONAL_APPLICANT",
    data: {
      additional_applicant_title: "Additional Applicant 1",
      additional_applicant_index: 0,
    },
  },
  POLICY_SELECTION: {
    screen: "POLICY_SELECTION",
    data: {
      recommended_policies: [
        {
          id: "essential",
          title: "CS Essential",
        },
        {
          id: "simple",
          title: "CS Simple",
        },
        {
          id: "advanced",
          title: "CS Advanced",
        },
      ],
    },
  },
  SELECTED_POLICY: {
    screen: "SELECTED_POLICY",
    data: {
      selected_policy: "CS Simple",
      starting_price: "Starting from \u20b9 20,000",
      policy_features:
        "\u2705 Pre & post hospitalisation\n\u274c AC Rooms\n\u2705 Recharge benefit\n\u2705 Out patient benefit\n\u2705 Hospital cash\n\u274c Road traffic accident\n\u274c Restoration benefit",
    },
  },
  YOUR_QUOTE: {
    screen: "YOUR_QUOTE",
    data: {
      payment_method: [
        {
          id: "monthly",
          title: "Monthly",
        },
        {
          id: "annually",
          title: "Annually (Save \u20b9 1000)",
        },
      ],
      price: "\u20b9 47.98 per month",
      is_price_visible: true,
    },
  },
  SUMMARY: {
    screen: "SUMMARY",
    data: {
      summary_policy: "CS Simple",
      summary_cover_level: "Treatment & full diagnosis",
      summary_people_covered: "Yourself with 2 children",
      summary_excess: "₹ 20000.00",
      summary_payment_method: "Annually",
      summary_cost_per_month: "₹ 1000.00",
    },
  },
  SUCCESS: {
    screen: "SUCCESS",
    data: {
      extension_message_response: {
        params: {
          flow_token: "Trai",
          some_param_name: "12345",
        },
      },
    },
  },
};

const getNextScreen = async (decryptedBody) => {
  const { screen, data, version, action, flow_token } = decryptedBody;
  // handle health check request
  if (action === "ping") {
    return {
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow and display APPLICANTS screen
  if (action === "INIT") {
    return {
      ...SCREEN_RESPONSES.APPLICANTS,
      data: {
        ...SCREEN_RESPONSES.APPLICANTS.data,
        additional_applicants_count: undefined,
      },
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      // handles when user interacts with APPLICANTS screen
      case "APPLICANTS":
        // handles when user selects who they want to cover
        if (data.cover_for_additional != null) {
          const isAddingAdditionalApplicant =
            data.cover_for_additional !== "myself";
          return {
            ...SCREEN_RESPONSES.APPLICANTS,
            data: {
              additional_applicants_count: isAddingAdditionalApplicant
                ? SCREEN_RESPONSES.APPLICANTS.data.additional_applicants_count
                : undefined,
              add_additional: isAddingAdditionalApplicant,
            },
          };
        }
        // otherwise navigate to next screen (COVER_LEVEL)
        return {
          ...SCREEN_RESPONSES.COVER_LEVEL,
          data: {
            // copy data received from Flow
            ...data,
          },
        };

      // handles when user interacts with COVER_LEVEL screen
      case "COVER_LEVEL":
        return {
          ...SCREEN_RESPONSES.EXCESS,
          data: {
            // copy initial screen data and data received from Flow
            ...SCREEN_RESPONSES.EXCESS.data,
            ...data,
          },
        };

      // handles when user interacts with EXCESS screen
      case "EXCESS":
        return {
          ...SCREEN_RESPONSES.DETAILS,
          data: {
            // copy data received from Flow
            ...data,
          },
        };

      // handles when user interacts with DETAILS screen
      case "DETAILS":
        // If user has selected they want to cover only their children skip "YOUR_HEALTH" screen
        if (data.cover === "my_children") {
          return {
            ...SCREEN_RESPONSES.ADDITIONAL_APPLICANT,
            data: {
              ...data,
              additional_applicants: [],
              additional_applicant_title: "Additional Applicant 1",
              additional_applicant_index: 0,
            },
          };
        }

        // otherwise navigate to next screen (YOUR_HEALTH)
        return {
          ...SCREEN_RESPONSES.YOUR_HEALTH,
          data: {
            // copy initial screen data then override specific fields
            ...data,
          },
        };

      // handles when user interacts with YOUR_HEALTH screen
      case "YOUR_HEALTH":
        if (data.cover === "myself") {
          return {
            ...SCREEN_RESPONSES.POLICY_SELECTION,
            data: {
              // copy initial screen data then override specific fields
              ...SCREEN_RESPONSES.POLICY_SELECTION.data,
              ...data,
            },
          };
        }

        // Navigate to next screen (ADDITIONAL_APPLICANT)
        return {
          ...SCREEN_RESPONSES.ADDITIONAL_APPLICANT,
          data: {
            ...data,
            additional_applicants: [],
            additional_applicant_title: "Additional Applicant 1",
            additional_applicant_index: 0,
          },
        };

      // handles when user interacts with ADDITIONAL_APPLICANT screen
      case "ADDITIONAL_APPLICANT":
        const {
          additional_relation,
          additional_dob,
          additonal_comorbidities,
          additonal_tobacco,
          ...rest
        } = data;
        const applicant_index = data.additional_applicant_index + 1;
        const updateApplicantsList = [
          ...data.additional_applicants,
          {
            relation: data.additional_relation,
            dob: data.additional_dob,
            comorbidities: data.additonal_comorbidities,
            tobacco: data.additonal_tobacco,
          },
        ];

        // Continue sending the same screen ID (ADDITIONAL_APPLICANT) until we have collected information for all additional applicants
        if (applicant_index < data.additional_applicants_count) {
          return {
            ...SCREEN_RESPONSES.ADDITIONAL_APPLICANT,
            data: {
              ...rest,
              additional_applicant_title: `Additional Applicant ${
                applicant_index + 1
              }`,
              additional_applicant_index: applicant_index,
              additional_applicants: updateApplicantsList,
            },
          };
        }

        // After all information is collected, navigate to next screen (ADDITIONAL_APPLICANT)
        return {
          ...SCREEN_RESPONSES.POLICY_SELECTION,
          data: {
            // copy initial screen data then override specific fields
            ...SCREEN_RESPONSES.POLICY_SELECTION.data,
            ...rest,
            additional_applicants: updateApplicantsList,
            additional_applicants_count: undefined, // we do not need to send the count to the next screen
            additional_applicant_index: undefined, // we do not need to send the index to the next screen
          },
        };

      // handles when user interacts with POLICY_SELECTION screen
      case "POLICY_SELECTION":
        const policy =
          data.selected_policy === "essential"
            ? {
                selected_policy: "CS Essential",
                policy_features:
                  "✅ Pre & post hospitalisation\n❌ AC Rooms\n✅ Recharge benefit\n✅ Out patient benefit\n✅ Hospital cash\n❌ Road traffic accident\n❌ Restoration benefit",
                starting_price: "Starting from ₹ 1000.00",
              }
            : data.selected_policy === "simple"
            ? {
                selected_policy: "CS Simple",
                policy_features:
                  "✅ Pre & post hospitalisation\n❌ AC Rooms\n❌ Recharge benefit\n✅ Out patient benefit\n✅ Hospital cash\n❌ Road traffic accident\n❌ Restoration benefit",
                starting_price: "Starting from ₹ 500.00",
              }
            : {
                selected_policy: "CS Advanced",
                policy_features:
                  "✅ Pre & post hospitalisation\n✅ AC Rooms\n✅ Recharge benefit\n✅ Out patient benefit\n✅ Hospital cash\n✅ Road traffic accident\n✅ Restoration benefit",
                starting_price: "Starting from ₹ 1500.00",
              };

        // Navigate to next screen (SELECTED_POLICY)
        return {
          ...SCREEN_RESPONSES.SELECTED_POLICY,
          data: {
            ...data,
            ...policy,
          },
        };

      // handles when user interacts with SELECTED_POLICY screen
      case "SELECTED_POLICY":
        // Navigate to next screen (YOUR_QUOTE)
        return {
          ...SCREEN_RESPONSES.YOUR_QUOTE,
          data: {
            // copy initial screen data then override specific fields
            ...SCREEN_RESPONSES.YOUR_QUOTE.data,
            ...data,
            is_price_visible: false,
          },
        };

      // handles when user interacts with YOUR_QUOTE screen
      case "YOUR_QUOTE":
        // handles when user selects the payment method, so the price is shown
        if (data.price == null) {
          return {
            ...SCREEN_RESPONSES.YOUR_QUOTE,
            data: {
              is_price_visible: true,
              price:
                data.payment_option === "monthly" ? "₹ 1000.00" : "₹ 10000.00",
            },
          };
        }

        // Navigate to the final screen (SUMMARY)
        return {
          ...SCREEN_RESPONSES.SUMMARY,
          data: {
            ...SCREEN_RESPONSES.SUMMARY.data,
            ...data,
          },
        };

      // handles when user completes SUMMARY screen
      case "SUMMARY":
        // TODO: save insurance details to your database and send quote back to user
        // send success response to complete and close the flow
        return {
          ...SCREEN_RESPONSES.SUCCESS,
          data: {
            extension_message_response: {
              params: {
                ...data,
              },
            },
          },
        };

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};

module.exports = { getNextScreen };
