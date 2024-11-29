import { AgChartsReact } from 'ag-charts-react';
import React from 'react'

const PieChart = ({ leadsCountByCourseId }: { leadsCountByCourseId?: any }) => {

    const data = {
        batchId: 46,
        category: "Validity",
        Follow_up_Leads: parseInt(leadsCountByCourseId?.[0]?.count ? leadsCountByCourseId?.[0]?.count : 0),
        Opportunity_leads: parseInt(leadsCountByCourseId?.[1]?.count ? leadsCountByCourseId?.[1]?.count : 0),
        Warm_Leads: parseInt(leadsCountByCourseId?.[2]?.count ? leadsCountByCourseId?.[2]?.count : 0)

    }

    const updatedData = { ...data };

    const total = updatedData.Follow_up_Leads + updatedData.Opportunity_leads + updatedData.Warm_Leads;
    const FollowupLeads = total > 0 ? (updatedData.Follow_up_Leads / total) * 100 : 0;
    const OpportunityLeads = total > 0 ? (updatedData.Opportunity_leads / total) * 100 : 0;
    const WarmLeads = total > 0 ? (updatedData.Warm_Leads / total) * 100 : 0;

    const getFills = () => {
        if (FollowupLeads == 0 || OpportunityLeads == 0) {
            return ['#90EE90', "#90EE90", '#90EE90'];
        } else {
            return ['#5B93FF', "#FFD66B", "#FF8F6B"];
        }
    };

    const options: any = {
        width: 400,
        height: 408,

        title: {
            text: "Analytics",
        },

        series: [{
            type: "pie",
            angleKey: "value",
            labelKey: "category",

            innerLabels: [
                {
                    text: `${total}`,
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                {
                    text: `Leads`,
                    margin: 7,
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            ],
            innerRadiusOffset: -80,
            fills: getFills(),
        }],
        data: [
            { category: "Follow up Leads", value: FollowupLeads, color: '#5B93FF' },
            { category: "Opportunity Leads", value: OpportunityLeads, color: '#FFD66B' },
            { category: "Warm Leads", value: WarmLeads, color: '#FF8F6B' }
        ]

    };



    const datas = [
        { category: "Follow up Leads", value: FollowupLeads, color: '#5B93FF' },
        { category: "Opportunity Leads", value: OpportunityLeads, color: '#FFD66B' },
        { category: "Warm Leads", value: WarmLeads, color: '#FF8F6B' }
    ]
    return (
        <div>
            <AgChartsReact options={options} />
        </div >
    )
}

export default PieChart