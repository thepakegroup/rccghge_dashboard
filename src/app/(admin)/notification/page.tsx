import React from 'react';

const page = () => {
  return (
    <section className="flex-center justify-center mt-16">
      <div>
        <h1 className="font-bold text-lg text-center text-fade-ash mb-9">
          Send push notification
        </h1>
        <div className="modal">
          <form className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10">
            <label htmlFor="type" className="input-field">
              <span>Notice type</span>
              <select name="type" className="input">
                <option value=""></option>
                <option value="info">info</option>
              </select>
            </label>
            <label htmlFor="title" className="input-field">
              <span>Notice title</span>
              <input type="text" className="input" />
            </label>
            <label htmlFor="description" className="input-field">
              <span>Notice content</span>
              <textarea rows={10} className="input" />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
