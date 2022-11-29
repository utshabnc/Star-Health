import { useState } from 'react';
import { useAllStatesQuery, useStateQuery, useAllManufacturersQuery } from '../../api';
import { useManufacturerQuery } from '../../api';

const DirectoryPage = () => {

	const { data: allManufacturers, loading } = useAllManufacturersQuery({});
	// console.log(allManufacturers);
	// const [drugType, setDrugType] = useState<string>();
  // const { data: allStates } = useAllStatesQuery({});
	// const { data: state, loading } = useStateQuery({ id });
	// const id = 'CO';
	// const { data: manufacturer } = useManufacturerQuery({
	// 	id: '100000000106',
	// });

	// console.log(state);
	// const [year, setYear] = useState<string>();
  // const [drugType, setDrugType] = useState<string>();
  // const { data: state, loading } = useStateQuery({ id, year, drugType });

	console.log(allManufacturers);
	// const someMap = allStates?.map( (object) => {
	// 	// const { data: state, loading } = useStateQuery({});
	// 	const id = object.stateId;
	// 	return id;
	// });

	// console.log(someMap);




	// console.log(state);
	// const [year, setYear] = useState<string>();


	// const { data: manufacturer } = useManufacturerQuery(
  //   { id, year },
  //   { skip: id == null }
  // );

	return (
		<>
			<section className="antialiased text-gray-600 py-4" x-data="app">
				<div className="flex flex-row">
					<div className=" bg-white shadow-lg rounded-lg border border-gray-200">
						<div className="overflow-x-auto p-3 ">
							<table>
								<thead>
									<tr>
										<th>
												asdasdasdasd
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>

									</tr>
									<tr>
									<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
									</tr>
									<tr>
									<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
									</tr>
									<tr>
									<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
									</tr>
									<tr>
									<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
										<td className='p-2'>asdasdasdasdasd</td>
									</tr>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default DirectoryPage;