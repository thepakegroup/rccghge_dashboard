import { baseUrl } from '@/util/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const cookie = req.cookies.get('token');

    const id = params.id

    const res = await fetch(`${baseUrl}load-all-media`,{
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${cookie?.value}`
      }
    })

    const data = await res.json();

    const [filteredData] = data.message.filter((item: any) => {
      return item.id == id
    })

    return NextResponse.json({message:filteredData,error:false});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error:true});
  }
}
