import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Graph } from 'react-d3-graph';

const MyGraph = (props) => {
    const [data, setData] = useState({ nodes: [], links: [] });

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "blue",
            size: 800,
            highlightStrokeColor: "blue"
        },
        link: {
            highlightColor: "darkgreen"
        }
    };
    useEffect(() => {
        const nodes = new Set();



        const links = props.response[0].data.paths.map((path) => {
            nodes.add(path[0]);
            nodes.add(path[1]);
            return { source: path[0], target: path[1] };
        });

        setData({
            nodes: Array.from(nodes).map((id) => ({ id })),
            links
        });
    }, []);

    return (
        <div className="border border-secondary mg-tp-20" >

            <Graph
                id="graph-id"
                data={data}
                 height={600}
                   width={800}

                config={myConfig}
            />
        </div>
    );
};

export default MyGraph;
